import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight, Store, Star, Clock, X, BookOpen, Users, Sparkles, Gem } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import heroImage from '@/assets/hero-image.jpg';

// Mock de Lojas Próximas - Agora refletindo a diversidade religiosa!
const nearbyStores = [
  {
    id: '1',
    name: 'Casa de Axé Caminho de Luz',
    rating: 4.9,
    deliveryTime: '20-30 min',
    fee: 'Grátis',
    category: 'Umbanda & Candomblé',
    image: 'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=400&h=400&fit=crop',
  },
  {
    id: '2',
    name: 'Livraria Luz Divina',
    rating: 4.8,
    deliveryTime: '30-45 min',
    fee: 'R$ 4,90',
    category: 'Cristão & Gospel',
    image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400&h=400&fit=crop',
  },
  {
    id: '3',
    name: 'Espaço Místico & Esotérico',
    rating: 5.0,
    deliveryTime: '15-25 min',
    fee: 'R$ 2,00',
    category: 'Esoterismo',
    image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop',
  },
  {
    id: '4',
    name: 'Artigos Religiosos São Judas',
    rating: 4.6,
    deliveryTime: '40-55 min',
    fee: 'R$ 6,90',
    category: 'Católico',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
];

// Categorias universais
const categories = [
  { name: 'Velas & Incensos', icon: Sparkles },
  { name: 'Livros Sagrados', icon: BookOpen },
  { name: 'Guias & Terços', icon: Users },
  { name: 'Cristais & Esoterismo', icon: Gem },
];

const Index = () => {
  const [showAddressModal, setShowAddressModal] = useState(true);
  const [tempAddress, setTempAddress] = useState('');
  const [savedAddress, setSavedAddress] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (showAddressModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showAddressModal]);

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempAddress.trim()) {
      setSavedAddress(tempAddress);
      setShowAddressModal(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />
      
      {/* --- POP-UP PERSISTENTE DE ENDEREÇO --- */}
      {showAddressModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-background w-full max-w-md p-6 md:p-8 rounded-2xl shadow-2xl animate-scale-in relative border border-border/50">
            <button 
              onClick={() => setShowAddressModal(false)}
              className="absolute top-4 right-4 text-white hover:text-accent transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="w-12 h-12 bg-accent/20 text-accent rounded-full flex items-center justify-center mb-4 mx-auto">
              <MapPin className="w-6 h-6" />
            </div>
            
            <h2 className="text-2xl font-display font-bold text-center mb-2 text-accent">
              Onde você está?
            </h2>
            
            <p className="text-white text-center mb-6 text-sm">
              Insira seu endereço para vermos as lojas de artigos religiosos e esotéricos que entregam na sua região.
            </p>
            
            <form onSubmit={handleSaveAddress} className="flex flex-col gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-accent w-5 h-5" />
                <Input 
                  placeholder="Rua, Número, Bairro ou CEP" 
                  className="pl-10 h-12 text-base focus-visible:ring-accent text-accent placeholder:text-muted-foreground"
                  value={tempAddress}
                  onChange={(e) => setTempAddress(e.target.value)}
                  autoFocus
                />
              </div>
              <Button type="submit" size="lg" className="w-full h-12 btn-gold text-base font-semibold text-primary-foreground">
                Ver lojas próximas
              </Button>
            </form>
          </div>
        </div>
      )}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="Produtos religiosos e esotéricos de todas as crenças"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-transparent" />
          </div>
          
          <div className="container-main relative py-20 md:py-32 lg:py-40">
            <div className="max-w-2xl animate-slide-up">
              <button 
                onClick={() => setShowAddressModal(true)}
                className="inline-flex items-center gap-2 bg-background/20 hover:bg-background/30 backdrop-blur-md text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6 transition-colors border border-primary-foreground/20"
              >
                <MapPin className="w-4 h-4 text-accent" /> 
                {savedAddress ? `Entregar em: ${savedAddress}` : 'Definir local de entrega'}
              </button>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
                Sua fé chegando <span className="text-accent">em minutos</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed">
                Velas, guias, incensos, bíblias e cristais das melhores lojas da sua região, independente da sua crença. Tudo a um clique de distância.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="btn-gold h-12 px-8" onClick={() => document.getElementById('lojas')?.scrollIntoView({ behavior: 'smooth' })}>
                  Ver Estabelecimentos
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categorias Rápidas */}
        <section className="py-8 bg-secondary/30 border-b border-border/50">
          <div className="container-main">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {categories.map((cat, i) => (
                <Link key={i} to={`/produtos?categoria=${cat.name.toLowerCase()}`} className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-background border border-border shadow-sm flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-all duration-300">
                    <cat.icon className="w-7 h-7" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Lojas Próximas */}
        <section id="lojas" className="py-16 bg-secondary/10">
          <div className="container-main">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
              <div>
                <h2 className="section-title mb-2">Perto de você</h2>
                <p className="text-muted-foreground">
                  {savedAddress ? `Mostrando lojas que entregam em ${savedAddress}` : 'Lojas e estabelecimentos disponíveis para entrega'}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {nearbyStores.map((store, index) => (
                <Link 
                  key={store.id} 
                  to={`/loja/${store.id}`} 
                  className="group bg-card rounded-xl border border-border/50 overflow-hidden hover:shadow-lg transition-all animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="h-32 relative overflow-hidden">
                    <img src={store.image} alt={store.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                      <Star className="w-3 h-3 text-accent fill-accent" /> {store.rating}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">{store.category}</div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{store.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {store.deliveryTime}</span>
                      <span className="flex items-center gap-1 text-green-600 font-medium">{store.fee}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Banner Discreto para Empresas */}
        <section className="py-8 bg-card border-t border-border">
          <div className="container-main">
            <div className="bg-primary/5 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-primary/10">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <Store className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display mb-1">Você tem uma loja de artigos religiosos ou esotéricos?</h3>
                  <p className="text-muted-foreground">Torne-se um parceiro e expanda suas vendas entregando rapidamente na sua região.</p>
                </div>
              </div>
              <Link to="/cadastro-empresa" className="shrink-0 w-full md:w-auto">
                <Button variant="outline" className="w-full md:w-auto border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Cadastrar Estabelecimento
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Index;