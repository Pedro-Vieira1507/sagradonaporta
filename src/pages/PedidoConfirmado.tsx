import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PedidoConfirmado() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
        <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Pedido Recebido!</h1>
        <p className="text-slate-600 mb-8">
          Seu pagamento foi processado com sucesso e o vendedor já foi notificado.
        </p>
        <Button 
          onClick={() => navigate('/')} 
          className="w-full h-12 text-lg font-semibold"
        >
          Voltar para a Loja
        </Button>
      </div>
    </div>
  );
}