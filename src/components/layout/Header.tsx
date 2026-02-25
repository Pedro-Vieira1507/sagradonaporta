import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, User, Heart, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/useCart';
import logo from '/src/assets/logo.png'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tempAddress, setTempAddress] = useState('');
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const handleSearchStores = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempAddress.trim()) {
      if (window.location.pathname === '/') {
          document.getElementById('lojas')?.scrollIntoView({ behavior: 'smooth' });
      } else {
          navigate('/#lojas');
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border py-2">
      <div className="container-main">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo e Nome (Link para Início) */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
                <img src={logo} alt="Logo Sagrado Na Porta" className="w-full h-full object-cover"/>
            </div>
            <div className="hidden lg:block">
              <h1 className="font-display text-xl font-semibold text-foreground leading-tight hover:text-primary transition-colors">
                Sagrado Na Porta
              </h1>
            </div>
          </Link>

          {/* Barra de CEP Central */}
          <div className="flex-1 max-w-xl hidden md:block">
             <form onSubmit={handleSearchStores} className="bg-muted/50 border border-border/50 p-1 rounded-xl flex items-center gap-2 shadow-sm transition-all focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50">
                <div className="flex items-center w-full px-3">
                  <MapPin className="text-accent w-5 h-5 flex-shrink-0" />
                  <Input 
                    placeholder="Digite seu endereço ou CEP" 
                    className="border-0 focus-visible:ring-0 text-sm h-10 bg-transparent w-full placeholder:text-muted-foreground/70"
                    value={tempAddress}
                    onChange={(e) => setTempAddress(e.target.value)}
                  />
                </div>
                <Button 
                  type="submit"
                  size="sm" 
                  className="btn-gold h-10 px-6 rounded-lg whitespace-nowrap"
                >
                  Ver Lojas
                  <ArrowRight className="w-4 h-4 ml-2 hidden lg:inline-block" />
                </Button>
              </form>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>

            <Button variant="ghost" size="icon" className="hidden sm:flex text-foreground/80 hover:text-foreground">
              <Heart className="w-5 h-5" />
            </Button>

            {/* ÍCONE DE PERFIL: Agora aponta corretamente para /login */}
            <Link to="/login">
              <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-foreground">
                <User className="w-5 h-5" />
              </Button>
            </Link>

            {/* Carrinho */}
            <Link to="/carrinho" className="relative ml-1">
              <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-foreground">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center border-2 border-background">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;