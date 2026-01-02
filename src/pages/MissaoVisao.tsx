import { Target, Eye, Compass } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const MissaoVisao = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container-main">
            <div className="max-w-3xl mx-auto text-center animate-slide-up">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Missão e <span className="text-accent">Visão</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed">
                Conheça os princípios que guiam nossa jornada e o futuro que almejamos construir.
              </p>
            </div>
          </div>
        </section>

        {/* Missão */}
        <section className="py-16">
          <div className="container-main">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 animate-fade-in">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="w-10 h-10 text-primary" />
                </div>
                <h2 className="section-title mb-6">Nossa Missão</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Levar fé, esperança e devoção a cada lar brasileiro através de produtos religiosos 
                  de qualidade, facilitando o acesso a artigos que fortaleçam a espiritualidade e 
                  enriqueçam os momentos de oração de nossos clientes.
                </p>
              </div>
              <div className="order-1 md:order-2 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-12 flex items-center justify-center">
                <Target className="w-32 h-32 text-primary/30" />
              </div>
            </div>
          </div>
        </section>

        {/* Visão */}
        <section className="py-16 bg-muted/50">
          <div className="container-main">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl p-12 flex items-center justify-center">
                <Eye className="w-32 h-32 text-accent/30" />
              </div>
              <div className="animate-fade-in">
                <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                  <Eye className="w-10 h-10 text-accent" />
                </div>
                <h2 className="section-title mb-6">Nossa Visão</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Ser a principal referência em produtos religiosos no Brasil, reconhecida pela 
                  excelência no atendimento, qualidade dos produtos e compromisso com a propagação 
                  da fé, alcançando cada vez mais famílias em todo o território nacional.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Propósito */}
        <section className="py-16">
          <div className="container-main">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <Compass className="w-10 h-10 text-primary" />
              </div>
              <h2 className="section-title mb-6">Nosso Propósito</h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                Mais do que vender produtos, nosso propósito é tocar corações. Cada terço enviado, 
                cada imagem entregue, cada bíblia que chega a um novo lar carrega consigo uma 
                mensagem de fé e esperança.
              </p>
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { number: '01', text: 'Facilitar o acesso à fé' },
                  { number: '02', text: 'Fortalecer comunidades' },
                  { number: '03', text: 'Espalhar esperança' },
                ].map((item, index) => (
                  <div key={index} className="bg-card rounded-xl p-6 border border-border/50">
                    <span className="text-3xl font-display font-bold text-primary/20">{item.number}</span>
                    <p className="text-foreground font-medium mt-2">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MissaoVisao;
