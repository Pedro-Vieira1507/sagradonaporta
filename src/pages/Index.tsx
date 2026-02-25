import { Link } from 'react-router-dom';
import { ArrowRight, Store, Star, Clock, BookOpen, Users, Sparkles, Gem } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import heroImage from '@/assets/hero-image.jpg';

// Mock de Lojas Próximas - Definido com base no CEP do cliente
export const nearbyStores = [
  { id: '1', name: 'Casa de Axé Caminho de Luz', rating: 4.9, deliveryTime: '20-30 min', fee: 'Grátis', category: 'Umbanda & Candomblé', image: 'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=400&h=400&fit=crop' },
  { id: '2', name: 'Livraria Luz Divina', rating: 4.8, deliveryTime: '30-45 min', fee: 'R$ 4,90', category: 'Cristão & Gospel', image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400&h=400&fit=crop' },
  { id: '3', name: 'Espaço Místico & Esotérico', rating: 5.0, deliveryTime: '15-25 min', fee: 'R$ 2,00', category: 'Esoterismo', image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop' },
  { id: '4', name: 'Artigos Religiosos São Judas', rating: 4.6, deliveryTime: '40-55 min', fee: 'R$ 6,90', category: 'Católico', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
];

const categories = [
  { name: 'Velas & Incensos', icon: Sparkles },
  { name: 'Livros Sagrados', icon: BookOpen },
  { name: 'Guias & Terços', icon: Users },
  { name: 'Cristais & Esoterismo', icon: Gem },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />
      
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImage} alt="Fundo religioso" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-transparent" />
          </div>
          
          <div className="container-main relative py-20 md:py-32 lg:py-40">
            <div className="max-w-2xl animate-slide-up">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
                Sua fé chegando <span className="text-accent">em minutos</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed">
                As melhores lojas de artigos religiosos entregando na sua porta agora mesmo.
              </p>
              
              <Button size="lg" className="btn-gold h-12 px-8 rounded-xl" onClick={() => document.getElementById('lojas')?.scrollIntoView({ behavior: 'smooth' })}>
                Ver Estabelecimentos
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        <section id="lojas" className="py-16 bg-secondary/10">
          <div className="container-main">
            <h2 className="section-title mb-10">Estabelecimentos próximos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {nearbyStores.map((store) => (
                <Link key={store.id} to={`/loja/${store.id}`} className="group bg-card rounded-xl border border-border/50 overflow-hidden hover:shadow-lg transition-all">
                  <div className="h-32 relative overflow-hidden">
                    <img src={store.image} alt={store.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{store.name}</h3>
                    <p className="text-sm text-muted-foreground">{store.deliveryTime} • {store.fee}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;