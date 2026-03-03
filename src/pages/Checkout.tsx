import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, MapPin, Edit2, CreditCard, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth'; 
import { supabase } from '@/integrations-supabase/client';
import { toast } from 'sonner';

declare global {
  interface Window { MercadoPago: any; }
}

const Checkout = () => {
  const { items, cartTotal, clearCart } = useCart();
  const { user } = useAuth(); 
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  
  const [address, setAddress] = useState({
    cep: user?.cep || '', street: user?.street || '', number: user?.number || '',
    complement: user?.complement || '', neighborhood: user?.neighborhood || '',
    city: user?.city || '', state: user?.state || '',
  });
  
  const [shipping] = useState({ 
    price: user?.state === 'SP' ? 9.90 : 14.90, 
    time: user?.state === 'SP' ? '25-35 min' : '45-60 min' 
  });

  const totalAmount = cartTotal + shipping.price;

  useEffect(() => {
    // Inicialização com sua Public Key Real
    if (window.MercadoPago && items.length > 0) {
      const mp = new window.MercadoPago('APP_USR-028b1878-2fa3-4504-b646-9159d2b3761c');
      const bricksBuilder = mp.bricks();

      const renderPaymentBrick = async (builder: any) => {
        const settings = {
          initialization: {
            amount: totalAmount,
            payer: { email: user?.email || 'cliente@sagradonaporta.com.br' },
          },
          customization: {
            paymentMethods: { 
              creditCard: "all", 
              pix: "all", 
              maxInstallments: 12 
            },
            visual: { style: { theme: 'default' } }
          },
          callbacks: {
            onReady: () => console.log("Checkout MP pronto"),
            onSubmit: ({ formData }: any) => processPayment(formData),
            onError: (error: any) => toast.error("Erro ao carregar módulo de pagamento"),
          },
        };
        const container = document.getElementById('paymentBrick_container');
        if (container) container.innerHTML = ''; 
        await builder.create('payment', 'paymentBrick_container', settings);
      };

      renderPaymentBrick(bricksBuilder);
    }
  }, [user, totalAmount, items]);

  const processPayment = async (formData: any) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('process-card-payment', {
        body: {
          formData,
          orderData: { user_id: user?.id, items, amount: totalAmount, address }
        }
      });

      // NOVO TRATAMENTO AQUI:
      if (error) {
        console.error("ERRO COMPLETO DO SUPABASE:", error);
        throw new Error(`Falha no servidor: ${error.message || 'Verifique o console'}`);
      }

      // Lendo a resposta customizada (adeus erros falsos de Supabase!)
      if (data.success === false) {
        // Se der erro, ele vai imprimir os detalhes exatos no seu console
        console.error("ERRO DO MERCADO PAGO:", data.mp_error);
        
        // Extrai a mensagem de erro direto da API
        const errorMessage = data.mp_error?.cause?.[0]?.description || data.mp_error?.message || "Erro nos dados do pagamento.";
        throw new Error(`Recusado: ${errorMessage}`);
      }

      // O status do pagamento agora vem dentro de data.data.status
      const paymentStatus = data.data.status;

      if (paymentStatus === 'rejected') {
        throw new Error("Pagamento recusado pela operadora do cartão.");
      }

      clearCart();
      toast.success('Pagamento aprovado! Preparando sua entrega.');
      navigate('/pedido-confirmado');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Erro no processamento. Verifique os dados.");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  if (items.length === 0) return null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 py-12">
        <div className="container-main">
          <h1 className="section-title mb-8 text-2xl font-bold flex items-center gap-2">
             Checkout Seguro <ShieldCheck className="text-green-600 w-6 h-6" />
          </h1>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              
              {/* Endereço estilo Delivery */}
              <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-lg font-semibold flex items-center gap-2 text-primary">
                    <MapPin className="w-5 h-5" /> Endereço de Entrega
                  </h2>
                  <Button variant="ghost" size="sm" onClick={() => setIsEditingAddress(!isEditingAddress)}>
                    <Edit2 className="w-4 h-4 mr-2" /> {isEditingAddress ? 'Cancelar' : 'Alterar'}
                  </Button>
                </div>
                {!isEditingAddress ? (
                  <div className="p-4 bg-slate-50 rounded-lg border border-dashed border-primary/30">
                    <p className="font-bold">{address.street}, {address.number}</p>
                    <p className="text-sm text-slate-500">{address.neighborhood} - {address.city}/{address.state}</p>
                    <div className="mt-3 flex items-center gap-2 text-green-600 text-sm font-semibold">
                      <Truck className="w-4 h-4" /> Entrega imediata em {shipping.time}
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-4 pt-2">
                    <Input placeholder="CEP" value={address.cep} onChange={(e) => setAddress({...address, cep: e.target.value})} />
                    <div className="grid grid-cols-4 gap-2">
                      <Input className="col-span-3" placeholder="Rua" value={address.street} onChange={(e) => setAddress({...address, street: e.target.value})} />
                      <Input placeholder="Nº" value={address.number} onChange={(e) => setAddress({...address, number: e.target.value})} />
                    </div>
                    <Button onClick={() => setIsEditingAddress(false)}>Confirmar Local</Button>
                  </div>
                )}
              </div>

              {/* Mercado Pago Container */}
              <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
                <h2 className="font-display text-lg font-semibold mb-6 flex items-center gap-2 text-primary">
                  <CreditCard className="w-5 h-5" /> Pagamento Transparente
                </h2>
                <div id="paymentBrick_container"></div>
              </div>
            </div>

            {/* Resumo */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 border border-border sticky top-24 shadow-md">
                <h3 className="font-display text-lg font-semibold mb-4 border-b pb-2">Resumo da Compra</h3>
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-slate-600">{item.quantity}x {item.name}</span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 border-t pt-4">
                  <div className="flex justify-between text-sm"><span>Subtotal</span><span>{formatPrice(cartTotal)}</span></div>
                  <div className="flex justify-between text-green-600 text-sm font-bold"><span>Taxa de Entrega</span><span>{formatPrice(shipping.price)}</span></div>
                  <div className="flex justify-between text-xl font-bold pt-2 border-t mt-2">
                    <span>Total</span><span className="text-primary">{formatPrice(totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;