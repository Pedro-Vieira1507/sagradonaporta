import { Heart, Users, Award, Target } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const QuemSomos = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container-main">
            <div className="max-w-3xl mx-auto text-center animate-slide-up">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Quem <span className="text-accent">Somos</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed">
                Nascemos do desejo de levar fé e devoção até a porta de cada lar brasileiro, 
                com produtos religiosos de qualidade e muito carinho.
              </p>
            </div>
          </div>
        </section>

        {/* Nossa História */}
        <section className="py-16">
          <div className="container-main">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <h2 className="section-title mb-6">Nossa História</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    A Sagrado Na Porta nasceu em 2020, no coração de São Paulo, quando um grupo de 
                    amigos devotos percebeu a dificuldade que muitas pessoas enfrentavam para encontrar 
                    produtos religiosos de qualidade.
                  </p>
                  <p>
                    Com a missão de facilitar o acesso a artigos de fé, começamos nossa jornada 
                    selecionando cuidadosamente cada produto, garantindo que cada peça carregue 
                    não apenas qualidade, mas também significado espiritual.
                  </p>
                  <p>
                    Hoje, atendemos milhares de famílias em todo o Brasil, levando terços, imagens, 
                    bíblias e outros artigos religiosos que fortalecem a fé e enriquecem momentos de 
                    oração e devoção.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary rounded-xl p-6 text-center animate-scale-in">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-1">5.000+</h3>
                  <p className="text-muted-foreground text-sm">Clientes Satisfeitos</p>
                </div>
                <div className="bg-secondary rounded-xl p-6 text-center animate-scale-in" style={{ animationDelay: '100ms' }}>
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-1">200+</h3>
                  <p className="text-muted-foreground text-sm">Parceiros</p>
                </div>
                <div className="bg-secondary rounded-xl p-6 text-center animate-scale-in" style={{ animationDelay: '200ms' }}>
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Award className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-1">500+</h3>
                  <p className="text-muted-foreground text-sm">Produtos</p>
                </div>
                <div className="bg-secondary rounded-xl p-6 text-center animate-scale-in" style={{ animationDelay: '300ms' }}>
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Target className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-1">27</h3>
                  <p className="text-muted-foreground text-sm">Estados Atendidos</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-16 bg-muted/50">
          <div className="container-main">
            <h2 className="section-title text-center mb-12">Nossos Valores</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Fé',
                  description: 'Acreditamos no poder da fé como força transformadora na vida das pessoas.',
                },
                {
                  title: 'Qualidade',
                  description: 'Selecionamos cada produto com rigor para garantir a melhor experiência aos nossos clientes.',
                },
                {
                  title: 'Respeito',
                  description: 'Tratamos cada cliente com carinho e respeito, honrando sua jornada espiritual.',
                },
              ].map((value, index) => (
                <div key={index} className="bg-card rounded-xl p-8 text-center border border-border/50 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
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

export default QuemSomos;
