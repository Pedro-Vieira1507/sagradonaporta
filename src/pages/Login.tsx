import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight, MapPin, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/integrations-supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Captura se o usuário estava tentando ir para o checkout antes de logar
  const from = location.state?.from?.pathname || "/";

  // Redirecionamento inteligente baseado no perfil
  useEffect(() => {
    if (!authLoading && user) {
      // Se for admin, vai para o painel administrativo
      if (isAdmin) {
        navigate('/admin');
      } 
      // Se o metadado indicar que é empresa, vai para o dashboard da loja
      else if (user.user_metadata?.role === 'establishment') {
        navigate('/dashboard-empresa');
      } 
      // Se for cliente, volta para onde estava (ex: checkout) ou home
      else {
        navigate(from);
      }
    }
  }, [user, isAdmin, authLoading, navigate, from]);

  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form (Ajustado para incluir CEP para entrega imediata)
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerCEP, setRegisterCEP] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      
      if (error) throw error;
      toast.success('Bem-vindo de volta!');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao fazer login');
    } finally {
      setFormLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerPassword !== registerConfirmPassword) {
      toast.error('As senhas não conferem');
      return;
    }

    if (registerCEP.length < 8) {
      toast.error('Informe um CEP válido para entrega');
      return;
    }
    
    setFormLoading(true);
    
    try {
      const { error } = await supabase.auth.signUp({
        email: registerEmail,
        password: registerPassword,
        options: {
          data: {
            name: registerName,
            cep: registerCEP,
            role: 'client', // Define como cliente por padrão
          }
        }
      });
      
      if (error) throw error;
      
      toast.success('Cadastro realizado! Verifique seu e-mail ou continue navegando.');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao criar conta');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-xl border border-border/50 p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8" />
              </div>
              <h1 className="font-display text-3xl font-bold text-foreground">Sua Conta</h1>
              <p className="text-muted-foreground mt-2">Acesse para pedir seu sagrado</p>
            </div>

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted/50 p-1">
                <TabsTrigger value="login" className="rounded-lg">Entrar</TabsTrigger>
                <TabsTrigger value="register" className="rounded-lg">Cadastrar</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="animate-fade-in">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">E-mail</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="seu@email.com"
                        className="pl-10 h-12"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Sua senha"
                        className="pl-10 pr-10 h-12"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full h-12 btn-primary text-lg" disabled={formLoading}>
                    {formLoading ? 'Conectando...' : 'Entrar na conta'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register" className="animate-fade-in">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Nome Completo</Label>
                    <Input
                      id="register-name"
                      placeholder="Como quer ser chamado?"
                      className="h-11"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-email">E-mail</Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="seu@email.com"
                        className="h-11"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-cep">CEP de Entrega</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="register-cep"
                          placeholder="00000-000"
                          className="h-11 pl-9"
                          value={registerCEP}
                          onChange={(e) => setRegisterCEP(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Senha</Label>
                      <Input
                        id="register-password"
                        type="password"
                        className="h-11"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-confirm">Confirmar</Label>
                      <Input
                        id="register-confirm"
                        type="password"
                        className="h-11"
                        value={registerConfirmPassword}
                        onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full h-12 btn-gold text-lg" disabled={formLoading}>
                    {formLoading ? 'Criando...' : 'Criar minha conta'}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-8 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">É proprietário de uma loja?</span><br />
                <Link to="/cadastro-empresa" className="text-primary hover:underline font-bold text-base inline-block mt-2">
                  Cadastre seu estabelecimento aqui
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;