import { Shield, Lock, CreditCard, CheckCircle, Eye, Server } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Seguranca = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container-main">
            <div className="max-w-3xl mx-auto text-center animate-slide-up">
              <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6 mx-auto">
                <Shield className="w-10 h-10 text-accent" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Sua <span className="text-accent">Segurança</span> é Nossa Prioridade
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed">
                Compre com tranquilidade. Utilizamos as mais avançadas tecnologias de segurança 
                para proteger seus dados e garantir uma experiência de compra segura.
              </p>
            </div>
          </div>
        </section>

        {/* Medidas de Segurança */}
        <section className="py-16">
          <div className="container-main">
            <h2 className="section-title text-center mb-12">Nossas Medidas de Segurança</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Lock,
                  title: 'Criptografia SSL',
                  description: 'Todas as informações transmitidas são protegidas por criptografia SSL de 256 bits, o mesmo padrão utilizado por grandes bancos.',
                },
                {
                  icon: CreditCard,
                  title: 'Pagamento Seguro',
                  description: 'Trabalhamos com as principais plataformas de pagamento do mercado, garantindo segurança em todas as transações.',
                },
                {
                  icon: Eye,
                  title: 'Monitoramento 24/7',
                  description: 'Nossa plataforma é monitorada continuamente para detectar e prevenir qualquer atividade suspeita.',
                },
                {
                  icon: Server,
                  title: 'Servidores Seguros',
                  description: 'Nossos servidores estão hospedados em data centers certificados com as mais rígidas normas de segurança.',
                },
                {
                  icon: Shield,
                  title: 'Proteção de Dados',
                  description: 'Seguimos rigorosamente a LGPD (Lei Geral de Proteção de Dados) para garantir a privacidade de suas informações.',
                },
                {
                  icon: CheckCircle,
                  title: 'Site Verificado',
                  description: 'Somos verificados por órgãos de proteção ao consumidor e possuímos certificação de site seguro.',
                },
              ].map((item, index) => (
                <div key={index} className="bg-card rounded-xl p-8 border border-border/50 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Selos */}
        <section className="py-16 bg-muted/50">
          <div className="container-main">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="section-title mb-6">Certificações e Selos</h2>
              <p className="text-muted-foreground mb-12">
                Possuímos certificações que atestam nosso compromisso com a segurança e a qualidade.
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                {['SSL Certificado', 'Site Blindado', 'Google Safe', 'PCI Compliant'].map((selo, index) => (
                  <div key={index} className="bg-card rounded-xl px-8 py-6 border border-border/50 flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <span className="font-medium text-foreground">{selo}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Dicas */}
        <section className="py-16">
          <div className="container-main">
            <div className="max-w-3xl mx-auto">
              <h2 className="section-title text-center mb-12">Dicas de Segurança para Você</h2>
              <div className="space-y-6">
                {[
                  'Nunca compartilhe sua senha com terceiros.',
                  'Verifique se o endereço do site começa com "https://".',
                  'Mantenha seu antivírus atualizado.',
                  'Desconfie de ofertas muito abaixo do valor de mercado.',
                  'Guarde os comprovantes de suas compras.',
                ].map((dica, index) => (
                  <div key={index} className="flex items-start gap-4 bg-card rounded-xl p-6 border border-border/50">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-accent" />
                    </div>
                    <p className="text-foreground">{dica}</p>
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

export default Seguranca;
