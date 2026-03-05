import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations-supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  AlertTriangle, 
  Store, 
  DollarSign, 
  ShoppingBag, 
  Settings, 
  LogOut,
  ArrowRight
} from 'lucide-react';

export default function DashboardEmpresa() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const [loja, setLoja] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stripeLoading, setStripeLoading] = useState(false);

  useEffect(() => {
    async function fetchLoja() {
      if (!user) {
        navigate('/login');
        return;
      }

      try {
        // Busca a loja atrelada ao ID do usuário logado
        // ATENÇÃO: Sua tabela 'lojas' precisa ter uma coluna 'user_id'
        const { data, error } = await supabase
          .from('lojas')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error("Erro ao buscar loja:", error);
        }

        setLoja(data);
      } catch (err) {
        console.error("Erro inesperado:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLoja();
  }, [user, navigate]);

  // Função que chama a nossa Edge Function para criar a conta na Stripe
  const handleConnectStripe = async () => {
    if (!loja?.id) return toast.error("Loja não encontrada.");
    
    setStripeLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-seller-account', {
        body: { 
          loja_id: loja.id, 
          email: user?.email 
        }
      });

      if (error || data?.error) {
        throw new Error(data?.error || "Erro ao conectar com a Stripe.");
      }

      if (data?.url) {
        // Redireciona para o ambiente seguro da Stripe
        window.location.href = data.url; 
      }
      
    } catch (err: any) {
      toast.error(err.message);
      setStripeLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Se o usuário tem perfil de empresa, mas não achamos a loja dele no banco
  if (!loja) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-xl shadow-sm border max-w-md w-full text-center">
            <Store className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Loja não encontrada</h2>
            <p className="text-slate-600 mb-6">
              Você ainda não concluiu o cadastro do seu estabelecimento.
            </p>
            <Button onClick={() => navigate('/cadastro-empresa')} className="w-full h-12">
              Concluir Cadastro da Loja
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // BLOQUEIO DA STRIPE: A loja existe, mas ainda não configurou os repasses
  if (loja && !loja.stripe_account_id) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-2xl shadow-lg border max-w-lg w-full text-center">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-amber-600" />
            </div>
            
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Falta pouco!</h2>
            <p className="text-slate-600 mb-8 text-lg">
              Sua loja <strong>{loja.nome || 'Sagrada'}</strong> está quase pronta. Para começar a vender e receber o dinheiro direto na sua conta bancária, precisamos configurar sua carteira digital.
            </p>
            
            <Button 
              onClick={handleConnectStripe} 
              disabled={stripeLoading}
              className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              {stripeLoading ? "Gerando ambiente seguro..." : "Configurar Conta Bancária"}
              {!stripeLoading && <ArrowRight className="ml-2 w-5 h-5" />}
            </Button>
            
            <p className="text-xs text-slate-400 mt-6 flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" /> Processamento seguro via Stripe
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // TELA LIBERADA: Dashboard oficial da loja (A Stripe já está configurada!)
  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Header />
      
      <div className="flex-1 flex max-w-7xl w-full mx-auto p-4 gap-6">
        {/* Menu Lateral */}
        <aside className="w-64 bg-white rounded-xl shadow-sm border p-4 hidden md:flex flex-col gap-2">
          <div className="p-4 mb-4 border-b">
            <h3 className="font-bold text-lg truncate">{loja.nome || 'Minha Loja'}</h3>
            <p className="text-xs text-green-600 font-semibold flex items-center gap-1 mt-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Pronta para vender
            </p>
          </div>
          
          <Button variant="ghost" className="justify-start gap-3 w-full bg-slate-50"><ShoppingBag className="w-5 h-5"/> Pedidos</Button>
          <Button variant="ghost" className="justify-start gap-3 w-full"><Store className="w-5 h-5"/> Produtos</Button>
          <Button variant="ghost" className="justify-start gap-3 w-full"><DollarSign className="w-5 h-5"/> Financeiro</Button>
          <Button variant="ghost" className="justify-start gap-3 w-full"><Settings className="w-5 h-5"/> Configurações</Button>
          
          <div className="mt-auto pt-4 border-t">
            <Button variant="ghost" onClick={signOut} className="justify-start gap-3 w-full text-red-500 hover:text-red-600 hover:bg-red-50">
              <LogOut className="w-5 h-5"/> Sair
            </Button>
          </div>
        </aside>

        {/* Conteúdo Principal */}
        <main className="flex-1">
          <h1 className="text-2xl font-bold text-slate-900 mb-6">Visão Geral</h1>
          
          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-l-4 border-l-blue-500">
              <p className="text-sm text-slate-500 font-medium">Vendas de Hoje</p>
              <h3 className="text-3xl font-black text-slate-800 mt-2">R$ 0,00</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-l-4 border-l-green-500">
              <p className="text-sm text-slate-500 font-medium">Pedidos Pendentes</p>
              <h3 className="text-3xl font-black text-slate-800 mt-2">0</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-l-4 border-l-purple-500">
              <p className="text-sm text-slate-500 font-medium">Saldo Disponível</p>
              <h3 className="text-3xl font-black text-slate-800 mt-2">R$ 0,00</h3>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border text-center py-16">
             <ShoppingBag className="w-16 h-16 text-slate-200 mx-auto mb-4" />
             <h3 className="text-xl font-semibold text-slate-700">Nenhum pedido ainda</h3>
             <p className="text-slate-500 mt-2">Os pedidos dos seus clientes aparecerão aqui.</p>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}

// Componente simples para o ícone de cadeado (se o lucide-react não importar automaticamente)
function Lock(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}