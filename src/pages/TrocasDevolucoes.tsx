import { RefreshCw, Package, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const TrocasDevolucoes = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container-main">
            <div className="max-w-3xl mx-auto text-center animate-slide-up">
              <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6 mx-auto">
                <RefreshCw className="w-10 h-10 text-accent" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Trocas e <span className="text-accent">Devoluções</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed">
                Conheça nossa política de trocas e devoluções. Queremos que você fique 
                100% satisfeito com sua compra.
              </p>
            </div>
          </div>
        </section>

        {/* Prazo */}
        <section className="py-16">
          <div className="container-main">
            <div className="max-w-3xl mx-auto">
              <div className="bg-accent/10 rounded-xl p-8 mb-12 flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                    Prazo de 7 Dias
                  </h2>
                  <p className="text-muted-foreground">
                    Você tem até 7 dias corridos após o recebimento do produto para solicitar 
                    troca ou devolução, conforme previsto no Código de Defesa do Consumidor.
                  </p>
                </div>
              </div>

              <h2 className="section-title mb-8">Quando Posso Trocar ou Devolver?</h2>
              
              <div className="space-y-6 mb-12">
                <div className="bg-card rounded-xl p-6 border border-border/50">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Produto com Defeito</h3>
                      <p className="text-muted-foreground">
                        Se o produto chegou com defeito de fabricação, você pode solicitar a troca 
                        ou devolução sem custos adicionais. Nós cobrimos o frete.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card rounded-xl p-6 border border-border/50">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Produto Diferente do Pedido</h3>
                      <p className="text-muted-foreground">
                        Se você recebeu um produto diferente do que comprou, entre em contato 
                        imediatamente. Faremos a troca sem custo algum.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card rounded-xl p-6 border border-border/50">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Arrependimento</h3>
                      <p className="text-muted-foreground">
                        Você pode devolver o produto por arrependimento dentro de 7 dias. Neste caso, 
                        o frete de devolução é por conta do cliente.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="section-title mb-8">Condições para Troca/Devolução</h2>
              
              <div className="bg-card rounded-xl p-8 border border-border/50 mb-12">
                <ul className="space-y-4">
                  {[
                    'Produto deve estar na embalagem original',
                    'Sem sinais de uso ou danos causados pelo cliente',
                    'Com todos os acessórios e manuais inclusos',
                    'Acompanhado da nota fiscal de compra',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary text-sm font-semibold">{index + 1}</span>
                      </div>
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <h2 className="section-title mb-8">Como Solicitar</h2>
              
              <div className="grid sm:grid-cols-3 gap-6 mb-12">
                {[
                  {
                    step: '1',
                    title: 'Entre em Contato',
                    description: 'Envie um e-mail ou ligue informando o número do pedido e o motivo.',
                  },
                  {
                    step: '2',
                    title: 'Aguarde Instruções',
                    description: 'Nossa equipe irá analisar e enviar as instruções de envio.',
                  },
                  {
                    step: '3',
                    title: 'Envie o Produto',
                    description: 'Após aprovação, envie o produto conforme orientado.',
                  },
                ].map((item, index) => (
                  <div key={index} className="bg-muted/50 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display text-xl font-bold mx-auto mb-4">
                      {item.step}
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800/50">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Importante</h3>
                    <p className="text-muted-foreground text-sm">
                      O prazo para reembolso é de até 10 dias úteis após recebermos o produto e 
                      confirmarmos que está de acordo com as condições de devolução.
                    </p>
                  </div>
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

export default TrocasDevolucoes;
