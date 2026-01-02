import { Truck, MapPin, Clock, Package, CheckCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const PrazoEntrega = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container-main">
            <div className="max-w-3xl mx-auto text-center animate-slide-up">
              <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6 mx-auto">
                <Truck className="w-10 h-10 text-accent" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Prazo de <span className="text-accent">Entrega</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed">
                Entregamos para todo o Brasil com rapidez e segurança. Confira os prazos 
                e condições de envio.
              </p>
            </div>
          </div>
        </section>

        {/* Prazos por Região */}
        <section className="py-16">
          <div className="container-main">
            <h2 className="section-title text-center mb-12">Prazos por Região</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  region: 'Sudeste',
                  states: 'SP, RJ, MG, ES',
                  days: '3 a 7 dias úteis',
                  highlight: true,
                },
                {
                  region: 'Sul',
                  states: 'PR, SC, RS',
                  days: '5 a 10 dias úteis',
                  highlight: false,
                },
                {
                  region: 'Centro-Oeste',
                  states: 'GO, MT, MS, DF',
                  days: '7 a 12 dias úteis',
                  highlight: false,
                },
                {
                  region: 'Nordeste',
                  states: 'BA, SE, AL, PE, PB, RN, CE, PI, MA',
                  days: '10 a 15 dias úteis',
                  highlight: false,
                },
                {
                  region: 'Norte',
                  states: 'AM, PA, RO, RR, AP, AC, TO',
                  days: '12 a 20 dias úteis',
                  highlight: false,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`rounded-xl p-6 border ${
                    item.highlight
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card border-border/50'
                  } animate-scale-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className={`w-5 h-5 ${item.highlight ? 'text-accent' : 'text-primary'}`} />
                    <h3 className="font-display text-xl font-semibold">{item.region}</h3>
                  </div>
                  <p className={`text-sm mb-4 ${item.highlight ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {item.states}
                  </p>
                  <div className="flex items-center gap-2">
                    <Clock className={`w-4 h-4 ${item.highlight ? 'text-accent' : 'text-primary'}`} />
                    <span className="font-medium">{item.days}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Informações Importantes */}
        <section className="py-16 bg-muted/50">
          <div className="container-main">
            <div className="max-w-3xl mx-auto">
              <h2 className="section-title text-center mb-12">Informações Importantes</h2>
              
              <div className="space-y-6">
                {[
                  {
                    icon: Package,
                    title: 'Prazo de Postagem',
                    description: 'Após a confirmação do pagamento, seu pedido é postado em até 2 dias úteis.',
                  },
                  {
                    icon: Clock,
                    title: 'Contagem do Prazo',
                    description: 'O prazo de entrega começa a contar a partir da postagem do pedido, não da compra.',
                  },
                  {
                    icon: Truck,
                    title: 'Transportadoras',
                    description: 'Trabalhamos com os Correios (PAC e SEDEX) e transportadoras parceiras para garantir a melhor entrega.',
                  },
                  {
                    icon: MapPin,
                    title: 'Áreas Remotas',
                    description: 'Algumas localidades podem ter prazo estendido. Consulte no checkout o prazo específico para seu CEP.',
                  },
                ].map((item, index) => (
                  <div key={index} className="bg-card rounded-xl p-6 border border-border/50 flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Rastreamento */}
        <section className="py-16">
          <div className="container-main">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="section-title mb-6">Rastreie seu Pedido</h2>
              <p className="text-muted-foreground mb-8">
                Após a postagem, você receberá um e-mail com o código de rastreamento. 
                Acompanhe sua entrega em tempo real!
              </p>
              <div className="bg-card rounded-xl p-8 border border-border/50">
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  {['Pedido Confirmado', 'Em Separação', 'Postado', 'Em Trânsito', 'Entregue'].map((step, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">{step}</span>
                      {index < 4 && <div className="w-8 h-0.5 bg-border hidden sm:block" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrazoEntrega;
