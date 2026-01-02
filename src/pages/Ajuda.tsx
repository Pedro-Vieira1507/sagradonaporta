import { HelpCircle, Mail, Phone, MessageCircle, Search } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const faqs = [
  {
    category: 'Pedidos',
    questions: [
      {
        question: 'Como faço para acompanhar meu pedido?',
        answer: 'Após a confirmação do pagamento, você receberá um e-mail com o código de rastreamento. Você também pode acompanhar na área "Meus Pedidos" após fazer login.',
      },
      {
        question: 'Posso alterar meu pedido após a compra?',
        answer: 'Alterações só podem ser feitas se o pedido ainda não foi enviado. Entre em contato conosco o mais rápido possível através do nosso canal de atendimento.',
      },
      {
        question: 'Como cancelo meu pedido?',
        answer: 'Para cancelar, entre em contato conosco em até 24 horas após a compra. Após o envio, será necessário aguardar a entrega e solicitar a devolução.',
      },
    ],
  },
  {
    category: 'Pagamento',
    questions: [
      {
        question: 'Quais formas de pagamento são aceitas?',
        answer: 'Aceitamos cartões de crédito (Visa, Mastercard, Elo, American Express), boleto bancário e PIX.',
      },
      {
        question: 'É possível parcelar?',
        answer: 'Sim! Parcelamos em até 12x sem juros no cartão de crédito para compras acima de R$ 100,00.',
      },
      {
        question: 'Quando meu pagamento será confirmado?',
        answer: 'Pagamentos via cartão e PIX são confirmados em minutos. Boletos podem levar até 3 dias úteis para compensação.',
      },
    ],
  },
  {
    category: 'Entrega',
    questions: [
      {
        question: 'Qual o prazo de entrega?',
        answer: 'O prazo varia de acordo com sua região. Geralmente, entregas para capitais levam de 3 a 7 dias úteis, e para o interior, de 7 a 15 dias úteis.',
      },
      {
        question: 'Vocês entregam para todo o Brasil?',
        answer: 'Sim! Entregamos para todos os estados brasileiros através dos Correios e transportadoras parceiras.',
      },
      {
        question: 'Posso retirar na loja?',
        answer: 'No momento não possuímos loja física para retirada. Todos os pedidos são enviados pelos Correios ou transportadoras.',
      },
    ],
  },
  {
    category: 'Trocas e Devoluções',
    questions: [
      {
        question: 'Como faço para trocar um produto?',
        answer: 'Você tem até 7 dias após o recebimento para solicitar a troca. Entre em contato conosco informando o número do pedido e o motivo.',
      },
      {
        question: 'Qual o prazo para devolução?',
        answer: 'O prazo para devolução é de 7 dias corridos após o recebimento do produto, conforme o Código de Defesa do Consumidor.',
      },
      {
        question: 'Quem paga o frete da devolução?',
        answer: 'Em caso de defeito ou erro no envio, o frete é por nossa conta. Para arrependimento, o cliente arca com o frete de devolução.',
      },
    ],
  },
];

const Ajuda = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = faqs.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (q) =>
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter((category) => category.questions.length > 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container-main">
            <div className="max-w-3xl mx-auto text-center animate-slide-up">
              <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6 mx-auto">
                <HelpCircle className="w-10 h-10 text-accent" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Central de <span className="text-accent">Ajuda</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed mb-8">
                Encontre respostas para suas dúvidas ou entre em contato conosco.
              </p>
              
              {/* Search */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar por dúvida..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-6 bg-background text-foreground"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16" id="faq">
          <div className="container-main">
            <div className="max-w-3xl mx-auto">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="mb-10">
                    <h2 className="font-display text-2xl font-semibold text-foreground mb-6" id={category.category.toLowerCase().replace(' ', '-')}>
                      {category.category}
                    </h2>
                    <Accordion type="single" collapsible className="space-y-4">
                      {category.questions.map((faq, faqIndex) => (
                        <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`} className="bg-card rounded-xl border border-border/50 px-6">
                          <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Nenhum resultado encontrado para "{searchTerm}"</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contato */}
        <section className="py-16 bg-muted/50">
          <div className="container-main">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="section-title mb-6">Ainda Precisa de Ajuda?</h2>
              <p className="text-muted-foreground mb-12">
                Nossa equipe está pronta para atender você através dos canais abaixo.
              </p>
              <div className="grid sm:grid-cols-3 gap-6">
                <a href="mailto:contato@sagradonaporta.com.br" className="bg-card rounded-xl p-8 border border-border/50 hover:border-primary transition-colors group">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">E-mail</h3>
                  <p className="text-muted-foreground text-sm">contato@sagradonaporta.com.br</p>
                </a>
                <a href="tel:+5511999999999" className="bg-card rounded-xl p-8 border border-border/50 hover:border-primary transition-colors group">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">Telefone</h3>
                  <p className="text-muted-foreground text-sm">(11) 99999-9999</p>
                </a>
                <a href="#" className="bg-card rounded-xl p-8 border border-border/50 hover:border-primary transition-colors group">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                    <MessageCircle className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">WhatsApp</h3>
                  <p className="text-muted-foreground text-sm">(11) 99999-9999</p>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Ajuda;
