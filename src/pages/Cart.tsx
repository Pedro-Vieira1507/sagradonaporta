import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();
  const [cep, setCep] = useState('');
  const [shipping, setShipping] = useState<{ price: number; days: string } | null>(null);
  const [loadingCep, setLoadingCep] = useState(false);

  const formatPrice = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const calculateShipping = async () => {
    if (cep.length < 8) {
      toast.error('Digite um CEP válido');
      return;
    }
    
    setLoadingCep(true);
    
    try {
      // Simulated CEP lookup
      const response = await fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        toast.error('CEP não encontrado');
        setShipping(null);
      } else {
        // Simulated shipping calculation
        const basePrice = data.uf === 'SP' ? 12.90 : 19.90;
        const days = data.uf === 'SP' ? '3-5 dias úteis' : '7-10 dias úteis';
        
        // Free shipping for orders over R$ 199
        if (cartTotal >= 199) {
          setShipping({ price: 0, days });
          toast.success(`Frete grátis para ${data.localidade}!`);
        } else {
          setShipping({ price: basePrice, days });
          toast.success(`Frete calculado para ${data.localidade}`);
        }
      }
    } catch {
      toast.error('Erro ao calcular frete');
    } finally {
      setLoadingCep(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-16">
          <div className="text-center">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              Seu carrinho está vazio
            </h1>
            <p className="text-muted-foreground mb-6">
              Adicione produtos para continuar comprando
            </p>
            <Link to="/produtos">
              <Button className="btn-primary">
                Ver Produtos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container-main">
          <h1 className="section-title mb-8">Meu Carrinho</h1>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-card rounded-xl p-4 border border-border/50"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{item.name}</h3>
                    <p className="text-lg font-bold text-primary mt-1">
                      {formatPrice(item.price)}
                    </p>
                    
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Remover
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl p-6 border border-border/50 sticky top-24">
                <h3 className="font-display text-xl font-semibold mb-4">Resumo</h3>
                
                {/* CEP Calculator */}
                <div className="mb-6">
                  <Label htmlFor="cep">Calcular Frete</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="cep"
                      placeholder="00000-000"
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                    />
                    <Button 
                      variant="outline" 
                      onClick={calculateShipping}
                      disabled={loadingCep}
                    >
                      {loadingCep ? '...' : 'OK'}
                    </Button>
                  </div>
                  {shipping && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {shipping.price === 0 ? (
                        <span className="text-green-600 font-medium">Frete Grátis!</span>
                      ) : (
                        <>Frete: {formatPrice(shipping.price)}</>
                      )}{' '}
                      - {shipping.days}
                    </p>
                  )}
                  {cartTotal < 199 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Frete grátis em compras acima de R$ 199,00
                    </p>
                  )}
                </div>
                
                <div className="space-y-3 border-t border-border pt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  {shipping && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Frete</span>
                      <span>{shipping.price === 0 ? 'Grátis' : formatPrice(shipping.price)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold border-t border-border pt-3">
                    <span>Total</span>
                    <span className="text-primary">
                      {formatPrice(cartTotal + (shipping?.price || 0))}
                    </span>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6 btn-gold"
                  onClick={() => navigate('/checkout')}
                >
                  Finalizar Compra
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                
                <Link to="/produtos" className="block mt-4">
                  <Button variant="outline" className="w-full">
                    Continuar Comprando
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
