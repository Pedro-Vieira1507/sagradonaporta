import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, MapPin, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/hooks/useCart';
import { supabase } from '@/integrations-supabase/client';
import { toast } from 'sonner';

const Checkout = () => {
  const { items, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [address, setAddress] = useState({
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
  });
  
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [shipping, setShipping] = useState({ price: 19.90, days: '5-7 dias úteis' });

  const formatPrice = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const fetchAddress = async (cep: string) => {
    if (cep.length < 8) return;
    
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`);
      const data = await response.json();
      
      if (!data.erro) {
        setAddress((prev) => ({
          ...prev,
          street: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,
        }));
        
        // Calculate shipping
        const shippingPrice = data.uf === 'SP' ? 12.90 : 19.90;
        const days = data.uf === 'SP' ? '3-5 dias úteis' : '7-10 dias úteis';
        
        if (cartTotal >= 199) {
          setShipping({ price: 0, days });
        } else {
          setShipping({ price: shippingPrice, days });
        }
      }
    } catch {
      toast.error('Erro ao buscar CEP');
    }
  };

  const handleSubmitOrder = async () => {
    setLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase.from('orders').insert([{
        user_id: user?.id || null,
        items: items as unknown as any,
        total: cartTotal + shipping.price,
        shipping_price: shipping.price,
        shipping_address: address as unknown as any,
        payment_method: paymentMethod,
        status: 'pending',
      }]);
      
      if (error) throw error;
      
      clearCart();
      toast.success('Pedido realizado com sucesso!');
      navigate('/pedido-confirmado');
    } catch (error: any) {
      toast.error('Erro ao processar pedido. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    navigate('/carrinho');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container-main">
          <h1 className="section-title mb-8">Checkout</h1>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            {[
              { num: 1, label: 'Endereço' },
              { num: 2, label: 'Pagamento' },
              { num: 3, label: 'Confirmação' },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                  step >= s.num 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step > s.num ? <Check className="w-5 h-5" /> : s.num}
                </div>
                <span className={`ml-2 hidden sm:inline ${step >= s.num ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {s.label}
                </span>
                {i < 2 && (
                  <div className={`w-12 sm:w-24 h-1 mx-4 rounded ${step > s.num ? 'bg-primary' : 'bg-muted'}`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Step 1: Address */}
              {step === 1 && (
                <div className="bg-card rounded-xl p-6 border border-border/50">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="w-6 h-6 text-primary" />
                    <h2 className="font-display text-xl font-semibold">Endereço de Entrega</h2>
                  </div>
                  
                  <div className="grid gap-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cep">CEP *</Label>
                        <Input
                          id="cep"
                          placeholder="00000-000"
                          value={address.cep}
                          onChange={(e) => {
                            setAddress({ ...address, cep: e.target.value });
                            fetchAddress(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="street">Rua *</Label>
                      <Input
                        id="street"
                        value={address.street}
                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                      />
                    </div>
                    
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="number">Número *</Label>
                        <Input
                          id="number"
                          value={address.number}
                          onChange={(e) => setAddress({ ...address, number: e.target.value })}
                        />
                      </div>
                      <div className="sm:col-span-2 space-y-2">
                        <Label htmlFor="complement">Complemento</Label>
                        <Input
                          id="complement"
                          placeholder="Apto, Bloco..."
                          value={address.complement}
                          onChange={(e) => setAddress({ ...address, complement: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="neighborhood">Bairro *</Label>
                        <Input
                          id="neighborhood"
                          value={address.neighborhood}
                          onChange={(e) => setAddress({ ...address, neighborhood: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">Cidade *</Label>
                        <Input
                          id="city"
                          value={address.city}
                          onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">Estado *</Label>
                        <Input
                          id="state"
                          value={address.state}
                          onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="mt-6 btn-primary"
                    onClick={() => setStep(2)}
                    disabled={!address.cep || !address.street || !address.number}
                  >
                    Continuar
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div className="bg-card rounded-xl p-6 border border-border/50">
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="w-6 h-6 text-primary" />
                    <h2 className="font-display text-xl font-semibold">Forma de Pagamento</h2>
                  </div>
                  
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer">
                        <RadioGroupItem value="credit" id="credit" />
                        <Label htmlFor="credit" className="flex-1 cursor-pointer">
                          <span className="font-medium">Cartão de Crédito</span>
                          <p className="text-sm text-muted-foreground">Parcele em até 12x sem juros</p>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer">
                        <RadioGroupItem value="pix" id="pix" />
                        <Label htmlFor="pix" className="flex-1 cursor-pointer">
                          <span className="font-medium">PIX</span>
                          <p className="text-sm text-muted-foreground">Aprovação imediata</p>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer">
                        <RadioGroupItem value="boleto" id="boleto" />
                        <Label htmlFor="boleto" className="flex-1 cursor-pointer">
                          <span className="font-medium">Boleto Bancário</span>
                          <p className="text-sm text-muted-foreground">Vencimento em 3 dias úteis</p>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                  
                  <div className="flex gap-4 mt-6">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Voltar
                    </Button>
                    <Button className="btn-primary" onClick={() => setStep(3)}>
                      Continuar
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {step === 3 && (
                <div className="bg-card rounded-xl p-6 border border-border/50">
                  <div className="flex items-center gap-3 mb-6">
                    <Check className="w-6 h-6 text-primary" />
                    <h2 className="font-display text-xl font-semibold">Confirme seu Pedido</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <Truck className="w-4 h-4" /> Endereço de Entrega
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {address.street}, {address.number}
                        {address.complement && `, ${address.complement}`}<br />
                        {address.neighborhood} - {address.city}/{address.state}<br />
                        CEP: {address.cep}
                      </p>
                    </div>
                    
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <CreditCard className="w-4 h-4" /> Forma de Pagamento
                      </h3>
                      <p className="text-sm text-muted-foreground capitalize">
                        {paymentMethod === 'credit' ? 'Cartão de Crédito' : 
                         paymentMethod === 'pix' ? 'PIX' : 'Boleto Bancário'}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Produtos</h3>
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>{item.quantity}x {item.name}</span>
                          <span>{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mt-6">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      Voltar
                    </Button>
                    <Button className="btn-gold flex-1" onClick={handleSubmitOrder} disabled={loading}>
                      {loading ? 'Processando...' : 'Finalizar Pedido'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl p-6 border border-border/50 sticky top-24">
                <h3 className="font-display text-xl font-semibold mb-4">Resumo do Pedido</h3>
                
                <div className="space-y-3 text-sm">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span className="text-muted-foreground">{item.quantity}x {item.name.slice(0, 25)}...</span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-border my-4 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Frete ({shipping.days})</span>
                    <span>{shipping.price === 0 ? 'Grátis' : formatPrice(shipping.price)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between text-lg font-bold border-t border-border pt-4">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(cartTotal + shipping.price)}</span>
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
