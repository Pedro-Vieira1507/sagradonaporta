import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, MapPin, CreditCard, QrCode, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PixModal } from '@/components/PixModal';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth'; 
import { supabase } from '@/integrations-supabase/client';
import { toast } from 'sonner';

// IMPORTS DA STRIPE
import { loadStripe } from '@stripe/stripe-js';
import { 
  Elements, 
  CardNumberElement, 
  CardExpiryElement, 
  CardCvcElement, 
  useStripe, 
  useElements 
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51T70LOFoh4DixS84mFP6mdTY0cOZLGnZQFhBU7vKrP7Y6VbSM1wfX4KjSVx1Ml20ZiogV7jbq58qih4LV7pmPch300UtzDTBcp');

const CheckoutForm = () => {
  const { items, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const stripe = useStripe();
  const elements = useElements();

  const [isPixModalOpen, setIsPixModalOpen] = useState(false);
  const [pixData, setPixData] = useState({ code: '', url: '' });

  const [address, setAddress] = useState({
    cep: user?.cep || '',
    street: user?.street || '',
    number: user?.number || '',
    neighborhood: user?.neighborhood || '',
    city: user?.city || '',
    state: user?.state || 'SP',
  });

  const [paymentData, setPaymentData] = useState({
    method: 'credit_card',
    card_holder: '',
    installments: '1'
  });

  const shippingPrice = address.state === 'SP' ? 9.90 : 14.90;
  const totalAmount = cartTotal + shippingPrice;

  const stripeElementOptions = {
    style: {
      base: {
        fontSize: '14px',
        color: '#0f172a',
        '::placeholder': { color: '#94a3b8' },
        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      },
      invalid: { color: '#ef4444' }
    },
  };

  const inputWrapperClass = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-3 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2";

  const handleFinalizeOrder = async () => {
    if (items.length === 0) {
      toast.error("Seu carrinho está vazio!");
      return;
    }

    if (!stripe || !elements) {
      toast.error("Stripe não inicializado.");
      return;
    }

    setLoading(true);

    try {
      // 1. Chamada para a Edge Function
      const { data, error: invokeError } = await supabase.functions.invoke('process-stripe-split', {
        body: {
          amount: totalAmount,
          seller_stripe_account_id: 'acct_1T716AFoh4rEuK50', 
          platform_fee_percent: 10,
          paymentMethod: paymentData.method
        }
      });

      if (invokeError) throw new Error("Erro de conexão com o servidor.");

      // --- EXTRAÇÃO BLINDADA DO SECRET ---
      // Se data for string, transformamos em objeto. Se não, usamos o objeto direto.
      const responseBody = typeof data === 'string' ? JSON.parse(data) : data;
      const clientSecret = responseBody?.clientSecret;

      console.log("Secret extraído:", clientSecret);

      if (data?.error) throw new Error(data.error);

      // 2. Fluxo de Cartão de Crédito
      if (paymentData.method === 'credit_card') {
        if (!clientSecret) {
          throw new Error("O servidor enviou os dados, mas o clientSecret não foi identificado.");
        }

        const cardElement = elements.getElement(CardNumberElement);
        
        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement!,
            billing_details: {
              name: paymentData.card_holder || user?.name || "Cliente Sagrado",
              email: user?.email,
            },
          },
        });

        if (stripeError) throw new Error(stripeError.message);

        if (paymentIntent?.status === 'succeeded') {
          toast.success("Pagamento aprovado!");
          clearCart();
          navigate('/pedido-confirmado');
        }
      } 
      // 3. Fluxo de PIX
      else if (paymentData.method === 'pix') {
        const pixCode = responseBody?.pixCode;
        if (!pixCode) throw new Error("Erro ao gerar o PIX. Verifique se o PIX está ativo na Stripe.");

        setPixData({ code: pixCode, url: responseBody?.pixQrCode });
        setIsPixModalOpen(true);
      }

    } catch (err: any) {
      console.error("Erro detalhado no checkout:", err);
      toast.error(err.message || "Erro ao processar o pedido.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 grid lg:grid-cols-2 gap-10">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <ShieldCheck className="text-green-500" /> Checkout Seguro
        </h2>

        {/* Endereço */}
        <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
           <h3 className="font-semibold flex items-center gap-2"><MapPin size={18}/> Endereço de Entrega</h3>
           <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
               <Input placeholder="CEP" value={address.cep} onChange={(e) => setAddress({...address, cep: e.target.value})} />
             </div>
             <div className="space-y-2 col-span-2">
               <Input placeholder="Rua / Logradouro" value={address.street} onChange={(e) => setAddress({...address, street: e.target.value})} />
             </div>
             <Input placeholder="Número" value={address.number} onChange={(e) => setAddress({...address, number: e.target.value})} />
             <Input placeholder="Bairro" value={address.neighborhood} onChange={(e) => setAddress({...address, neighborhood: e.target.value})} />
           </div>
        </div>

        {/* Pagamento */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><CreditCard size={18}/> Pagamento</h3>
          <Tabs defaultValue="credit_card" onValueChange={(v) => setPaymentData({...paymentData, method: v})}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="credit_card">Cartão</TabsTrigger>
              <TabsTrigger value="pix">PIX</TabsTrigger>
            </TabsList>

            <TabsContent value="credit_card" className="space-y-4">
              <div className={inputWrapperClass}>
                <CardNumberElement options={stripeElementOptions} className="w-full" />
              </div>

              <Input 
                placeholder="Nome impresso no Cartão" 
                value={paymentData.card_holder}
                onChange={(e) => setPaymentData({...paymentData, card_holder: e.target.value})} 
              />
              
              <div className="grid grid-cols-2 gap-4">
                <div className={inputWrapperClass}>
                  <CardExpiryElement options={stripeElementOptions} className="w-full" />
                </div>
                <div className={inputWrapperClass}>
                  <CardCvcElement options={stripeElementOptions} className="w-full" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pix" className="text-center py-6 bg-slate-50 rounded-lg">
                <QrCode size={48} className="mx-auto mb-2 text-primary opacity-50" />
                <p className="text-sm font-medium">O QR Code do PIX será gerado no próximo passo.</p>
            </TabsContent>
          </Tabs>
        </div>

        <Button 
          className="w-full h-14 text-lg font-bold bg-green-600 hover:bg-green-700 transition-all"
          onClick={handleFinalizeOrder}
          disabled={loading || items.length === 0 || !stripe}
        >
          {loading ? "Processando..." : <><ShoppingBag className="mr-2"/> Finalizar Pedido</>}
        </Button>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border h-fit sticky top-10">
        <h3 className="font-bold text-lg mb-4 border-b pb-2">Resumo</h3>
        {items.map(item => (
          <div key={item.id} className="flex justify-between py-2 text-sm italic text-slate-600">
            <span>{item.quantity}x {item.name}</span>
            <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="mt-6 pt-4 border-t-2 border-dashed border-slate-200">
          <div className="flex justify-between text-xl font-black text-primary">
            <span>Total</span>
            <span>R$ {totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <PixModal 
        isOpen={isPixModalOpen}
        onClose={() => {
            setIsPixModalOpen(false);
            clearCart();
            navigate('/pedido-confirmado');
        }}
        pixCode={pixData.code}
        qrCodeUrl={pixData.url}
        totalAmount={totalAmount}
      />
    </div>
  );
};

export default function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}