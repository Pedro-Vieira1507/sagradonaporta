import { Link } from 'react-router-dom';
import { Handshake, TrendingUp, Package, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Parceiro = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container-main">
            <div className="max-w-3xl mx-auto text-center animate-slide-up">
              <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6 mx-auto">
                <Handshake className="w-10 h-10 text-accent" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Seja Nosso <span className="text-accent">Parceiro</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed mb-8">
                Você possui uma loja, paróquia ou comunidade religiosa? Junte-se a nós e leve 
                produtos de qualidade para sua comunidade com condições especiais.
              </p>
              <Link to="/cadastro-empresa">
                <Button size="lg" className="btn-gold">
                  Quero Ser Parceiro
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-16">
          <div className="container-main">
            <h2 className="section-title text-center mb-12">Benefícios Exclusivos</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: TrendingUp,
                  title: 'Preços Especiais',
                  description: 'Descontos exclusivos para compras em atacado.',
                },
                {
                  icon: Package,
                  title: 'Frete Diferenciado',
                  description: 'Condições especiais de frete para parceiros.',
                },
                {
                  icon: Users,
                  title: 'Suporte Dedicado',
                  description: 'Atendimento prioritário para parceiros.',
                },
                {
                  icon: Handshake,
                  title: 'Parcelamento',
                  description: 'Condições facilitadas de pagamento.',
                },
              ].map((item, index) => (
                <div key={index} className="bg-card rounded-xl p-8 text-center border border-border/50 animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-4">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Como Funciona */}
        <section className="py-16 bg-muted/50">
          <div className="container-main">
            <h2 className="section-title text-center mb-12">Como Funciona</h2>
            <div className="max-w-3xl mx-auto">
              <div className="space-y-8">
                {[
                  {
                    step: '01',
                    title: 'Faça seu Cadastro',
                    description: 'Preencha o formulário com os dados da sua empresa ou instituição.',
                  },
                  {
                    step: '02',
                    title: 'Aguarde a Análise',
                    description: 'Nossa equipe irá analisar seu cadastro em até 48 horas.',
                  },
                  {
                    step: '03',
                    title: 'Receba sua Aprovação',
                    description: 'Após aprovado, você terá acesso às condições especiais.',
                  },
                  {
                    step: '04',
                    title: 'Comece a Comprar',
                    description: 'Faça seus pedidos com descontos e benefícios exclusivos.',
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-6 items-start animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display text-xl font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div className="pt-2">
                      <h3 className="font-display text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Requisitos */}
        <section className="py-16">
          <div className="container-main">
            <div className="max-w-3xl mx-auto">
              <h2 className="section-title text-center mb-12">Requisitos para Parceria</h2>
              <div className="bg-card rounded-xl p-8 border border-border/50">
                <ul className="space-y-4">
                  {[
                    'CNPJ ativo e regularizado',
                    'Atuação no segmento religioso ou correlato',
                    'Pedido mínimo conforme categoria',
                    'Compromisso com a qualidade no atendimento ao cliente final',
                  ].map((req, index) => (
                    <li key={index} className="flex items-center gap-4">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                      <span className="text-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container-main text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Pronto para Começar?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Cadastre-se agora e faça parte da nossa rede de parceiros. Juntos, podemos 
              levar mais fé e devoção para as pessoas.
            </p>
            <Link to="/cadastro-empresa">
              <Button size="lg" className="btn-gold">
                Cadastrar Minha Empresa
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Parceiro;
