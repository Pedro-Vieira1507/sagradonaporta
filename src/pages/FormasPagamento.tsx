import { CreditCard, Landmark, QrCode, Shield, CheckCircle, Percent } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const FormasPagamento = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container-main">
            <div className="max-w-3xl mx-auto text-center animate-slide-up">
              <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6 mx-auto">
                <CreditCard className="w-10 h-10 text-accent" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Formas de <span className="text-accent">Pagamento</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed">
                Diversas opções para você escolher a que melhor se adapta às suas necessidades.
              </p>
            </div>
          </div>
        </section>

        {/* Métodos de Pagamento */}
        <section className="py-16">
          <div className="container-main">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Cartão de Crédito */}
              <div className="bg-card rounded-xl p-8 border border-border/50 animate-scale-in">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <CreditCard className="w-8 h-8 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  Cartão de Crédito
                </h2>
                <p className="text-muted-foreground mb-6">
                  Parcele suas compras em até 12x sem juros.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-foreground text-sm">Visa</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-foreground text-sm">Mastercard</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-foreground text-sm">Elo</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-foreground text-sm">American Express</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-foreground text-sm">Hipercard</span>
                  </div>
                </div>
              </div>

              {/* PIX */}
              <div className="bg-card rounded-xl p-8 border border-border/50 animate-scale-in" style={{ animationDelay: '100ms' }}>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <QrCode className="w-8 h-8 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  PIX
                </h2>
                <p className="text-muted-foreground mb-6">
                  Pagamento instantâneo com confirmação imediata.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-foreground text-sm">Aprovação imediata</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-foreground text-sm">Disponível 24/7</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-foreground text-sm">Sem taxas adicionais</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Percent className="w-5 h-5 text-accent" />
                    <span className="text-accent font-semibold text-sm">5% de desconto</span>
                  </div>
                </div>
              </div>

              {/* Boleto */}
              <div className="bg-card rounded-xl p-8 border border-border/50 animate-scale-in" style={{ animationDelay: '200ms' }}>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Landmark className="w-8 h-8 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  Boleto Bancário
                </h2>
                <p className="text-muted-foreground mb-6">
                  Pague em qualquer banco ou casa lotérica.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-foreground text-sm">Vencimento em 3 dias</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-foreground text-sm">Pague em qualquer banco</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-foreground text-sm">Compensação em até 3 dias</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Parcelamento */}
        <section className="py-16 bg-muted/50">
          <div className="container-main">
            <div className="max-w-3xl mx-auto">
              <h2 className="section-title text-center mb-12">Tabela de Parcelamento</h2>
              <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Parcelas</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Valor Mínimo</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Juros</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      { parcelas: '1x', minimo: 'Qualquer valor', juros: 'Sem juros' },
                      { parcelas: '2x', minimo: 'R$ 50,00', juros: 'Sem juros' },
                      { parcelas: '3x', minimo: 'R$ 75,00', juros: 'Sem juros' },
                      { parcelas: '6x', minimo: 'R$ 150,00', juros: 'Sem juros' },
                      { parcelas: '9x', minimo: 'R$ 225,00', juros: 'Sem juros' },
                      { parcelas: '12x', minimo: 'R$ 300,00', juros: 'Sem juros' },
                    ].map((row, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-foreground font-medium">{row.parcelas}</td>
                        <td className="px-6 py-4 text-muted-foreground">{row.minimo}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-2 text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            {row.juros}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Segurança */}
        <section className="py-16">
          <div className="container-main">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h2 className="section-title mb-6">Pagamento 100% Seguro</h2>
              <p className="text-muted-foreground mb-8">
                Todas as transações são processadas em ambiente seguro com criptografia SSL. 
                Seus dados estão protegidos e não armazenamos informações de cartão.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {['SSL Seguro', 'PCI Compliant', 'Dados Protegidos'].map((badge, index) => (
                  <div key={index} className="bg-card rounded-lg px-6 py-3 border border-border/50 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-500" />
                    <span className="font-medium text-foreground">{badge}</span>
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

export default FormasPagamento;
