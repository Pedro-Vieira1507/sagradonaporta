import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/useCart';
import logo from '/src/assets/logo.png'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/produtos?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  const navLinks = [
    { name: 'Início', href: '/' },
    { name: 'Produtos', href: '/produtos' },
    { name: 'Quem Somos', href: '/quem-somos' },
    { name: 'Missão e Visão', href: '/missao-visao' },
    { name: 'Ajuda', href: '/ajuda' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container-main">
        {/* Top bar */}
        <div className="hidden md:flex justify-between items-center py-2 text-sm text-muted-foreground border-b border-border/50">
          <span>Frete grátis para compras acima de R$ 199,00</span>
          <div className="flex gap-4">
            <Link to="/seguranca" className="hover:text-primary transition-colors">Segurança</Link>
            <Link to="/ajuda" className="hover:text-primary transition-colors">Central de Ajuda</Link>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
                <img src={logo} alt="Logo Sagrado Na Porta" className="w-full h-full object-cover"/>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display text-xl font-semibold text-foreground leading-tight">
                Sagrado Na Porta
              </h1>
              <p className="text-xs text-muted-foreground">Produtos Religiosos</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-foreground/80 hover:text-primary font-medium transition-colors link-hover"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="Buscar produtos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-48 md:w-64"
                    autoFocus
                  />
                  <Button type="button" variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </form>
              ) : (
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                  <Search className="w-5 h-5" />
                </Button>
              )}
            </div>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="w-5 h-5" />
            </Button>

            {/* User */}
            <Link to="/login">
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </Link>

            {/* Cart */}
            <Link to="/carrinho" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-slide-up">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="my-2 border-border" />
              <Link
                to="/seguranca"
                className="px-4 py-3 text-muted-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Segurança
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
