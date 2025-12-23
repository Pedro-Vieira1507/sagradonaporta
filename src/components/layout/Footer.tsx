import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, CreditCard, Shield, Truck } from 'lucide-react';
import logo from '/src/assets/logo.png'

const Footer = () => {
  return (
    <footer className="bg-[linear-gradient(135deg,#7C3083,#010101)] text-white [&_.font-semibold]:text-[#ce9647]">
      {/* Trust badges */}
      <div className="border-b border-primary-foreground/10">
        <div className="container-main py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <Truck className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h4 className="font-semibold">Entrega Rápida</h4>
                <p className="text-sm text-primary-foreground/70">Para todo o Brasil</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h4 className="font-semibold">Compra Segura</h4>
                <p className="text-sm text-primary-foreground/70">Seus dados protegidos</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h4 className="font-semibold">Parcelamento</h4>
                <p className="text-sm text-primary-foreground/70">Em até 12x sem juros</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container-main py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
                <img src={logo} alt="Logo Sagrado Na Porta" className="w-full h-full object-cover"/>
              </div>
              <span className="font-display text-lg font-semibold">Sagrado Na Porta</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-4">
              Levamos fé e devoção até você com produtos religiosos de qualidade, 
              selecionados com carinho para fortalecer sua espiritualidade.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Institutional */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Institucional</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/quem-somos" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link to="/missao-visao" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Missão e Visão
                </Link>
              </li>
              <li>
                <Link to="/seguranca" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Segurança
                </Link>
              </li>
              <li>
                <Link to="/parceiro" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Seja Nosso Parceiro
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Ajuda</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/ajuda" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link to="/ajuda#trocas" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link to="/ajuda#entregas" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Prazo de Entrega
                </Link>
              </li>
              <li>
                <Link to="/ajuda#pagamento" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Formas de Pagamento
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-primary-foreground/70">
                <Mail className="w-5 h-5 text-accent" />
                <span>contato@sagradonaporta.com.br</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/70">
                <Phone className="w-5 h-5 text-accent" />
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/70">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span>São Paulo - SP, Brasil</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-main py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>© 2024 Sagrado Na Porta. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <Link to="/termos" className="hover:text-accent transition-colors">Termos de Uso</Link>
              <Link to="/privacidade" className="hover:text-accent transition-colors">Política de Privacidade</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
