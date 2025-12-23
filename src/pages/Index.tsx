import { Link } from 'react-router-dom';
import { ArrowRight, Cross, BookOpen, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ProductCard';
import heroImage from '@/assets/hero-image.jpg';

// Mock products for initial display
const featuredProducts = [
  {
    id: '1',
    name: 'Terço de Madeira Nossa Senhora Aparecida',
    price: 39.90,
    originalPrice: 49.90,
    image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop',
    category: 'Terços',
  },
  {
    id: '2',
    name: 'Bíblia Sagrada Edição de Luxo',
    price: 89.90,
    image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400&h=400&fit=crop',
    category: 'Bíblias',
  },
  {
    id: '3',
    name: 'Imagem de São Jorge 30cm',
    price: 129.90,
    originalPrice: 159.90,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    category: 'Imagens',
  },
  {
    id: '4',
    name: 'Kit Velas Aromáticas 7 Dias',
    price: 24.90,
    image: 'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=400&h=400&fit=crop',
    category: 'Velas',
  },
];

const categories = [
  { name: 'Terços', icon: Cross, count: 45 },
  { name: 'Imagens', icon: Users, count: 78 },
  { name: 'Bíblias', icon: BookOpen, count: 32 },
  { name: 'Velas', icon: Star, count: 56 },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="Produtos religiosos"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-transparent" />
          </div>
          
          <div className="container-main relative py-24 md:py-32 lg:py-40">
            <div className="max-w-2xl animate-slide-up">
              <span className="inline-block bg-accent/20 text-accent-foreground px-4 py-1 rounded-full text-sm font-medium mb-6">
                ✨ Fé e devoção na sua casa
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
                Sagrado <span className="text-accent">Na Porta</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed">
                Produtos religiosos selecionados com carinho para fortalecer sua fé e
                enriquecer seus momentos de oração e devoção.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/produtos">
                  <Button size="lg" className="btn-gold text-base">
                    Ver Produtos
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/quem-somos">
                  <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                    Conheça Nossa História
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-secondary/50">
          <div className="container-main">
            <div className="text-center mb-12">
              <h2 className="section-title mb-4">Explore por Categoria</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Encontre o produto perfeito para sua devoção navegando por nossas categorias
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {categories.map((category, index) => (
                <Link
                  key={category.name}
                  to={`/produtos?categoria=${category.name.toLowerCase()}`}
                  className="group bg-card hover:bg-primary rounded-xl p-6 text-center transition-all duration-300 hover:shadow-burgundy animate-scale-in border border-border/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 group-hover:bg-primary-foreground/20 flex items-center justify-center transition-colors">
                    <category.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary-foreground transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/70 transition-colors">
                    {category.count} produtos
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="container-main">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
              <div>
                <h2 className="section-title mb-2">Produtos em Destaque</h2>
                <p className="text-muted-foreground">Os mais amados pelos nossos clientes</p>
              </div>
              <Link to="/produtos">
                <Button variant="outline" className="group">
                  Ver Todos
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <div key={product.id} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container-main">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Seja Nosso Parceiro
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
                Você possui uma loja ou paróquia? Junte-se a nós e leve produtos de 
                qualidade para sua comunidade com condições especiais.
              </p>
              <Link to="/parceiro">
                <Button size="lg" className="btn-gold">
                  Quero Ser Parceiro
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-muted/50">
          <div className="container-main">
            <div className="text-center mb-12">
              <h2 className="section-title mb-4">O Que Nossos Clientes Dizem</h2>
              <p className="text-muted-foreground">Depoimentos de quem já comprou conosco</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Maria das Graças',
                  text: 'Produtos maravilhosos! A qualidade é excelente e a entrega foi super rápida. Recomendo a todos.',
                  rating: 5,
                },
                {
                  name: 'José Carlos',
                  text: 'Comprei um terço para presente e minha mãe amou! Embalagem linda e cuidadosa.',
                  rating: 5,
                },
                {
                  name: 'Ana Paula',
                  text: 'Atendimento impecável. Tive uma dúvida e fui atendida rapidamente. Voltarei a comprar com certeza!',
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 border border-border/50 animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-foreground/80 mb-4 italic">"{testimonial.text}"</p>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                </div>
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
