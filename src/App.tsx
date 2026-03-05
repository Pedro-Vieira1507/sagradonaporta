import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/hooks/useCart";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Login from "./pages/Login";
import CompanyRegister from "./pages/CompanyRegister";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import QuemSomos from "./pages/QuemSomos";
import MissaoVisao from "./pages/MissaoVisao";
import Seguranca from "./pages/Seguranca";
import Parceiro from "./pages/Parceiro";
import Ajuda from "./pages/Ajuda";
import TrocasDevolucoes from "./pages/TrocasDevolucoes";
import PrazoEntrega from "./pages/PrazoEntrega";
import FormasPagamento from "./pages/FormasPagamento";
import NotFound from "./pages/NotFound";
import { initMercadoPago } from '@mercadopago/sdk-react';
initMercadoPago('APP_USR-028b1878-2fa3-4504-b646-9159d2b3761c');
import PedidoConfirmado from './pages/PedidoConfirmado';
import DashboardEmpresa from './pages/DashboardEmpresa';


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* Rota ajustada para carregar os produtos de uma loja específica */}
              <Route path="/loja/:id" element={<Products />} />
              <Route path="/produtos" element={<Products />} />
              
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro-empresa" element={<CompanyRegister />} />
              <Route path="/carrinho" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/quem-somos" element={<QuemSomos />} />
              <Route path="/missao-visao" element={<MissaoVisao />} />
              <Route path="/seguranca" element={<Seguranca />} />
              <Route path="/parceiro" element={<Parceiro />} />
              <Route path="/ajuda" element={<Ajuda />} />
              <Route path="/trocas-devolucoes" element={<TrocasDevolucoes />} />
              <Route path="/prazo-entrega" element={<PrazoEntrega />} />
              <Route path="/formas-pagamento" element={<FormasPagamento />} />
              <Route path="/pedido-confirmado" element={<PedidoConfirmado />} />
              <Route path="/dashboard-empresa" element={<DashboardEmpresa />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;