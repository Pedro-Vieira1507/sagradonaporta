import { useState } from 'react';
import { Check, Copy, QrCode, ShieldCheck } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

interface PixModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrCodeUrl: string; // Link da imagem do QR Code
  pixCode: string;   // Código copia e cola
  totalAmount: number;
}

export const PixModal = ({ isOpen, onClose, qrCodeUrl, pixCode, totalAmount }: PixModalProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    toast.success("Código PIX copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex justify-center gap-2">
            <QrCode className="text-primary" /> Pagamento via PIX
          </DialogTitle>
          <DialogDescription className="text-lg font-medium text-slate-900">
            Total a pagar: {totalAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4 py-4">
          {/* QR Code */}
          <div className="bg-white p-2 border-2 border-slate-100 rounded-xl shadow-inner">
            <img 
              src={qrCodeUrl} 
              alt="QR Code PIX" 
              className="w-48 h-48 object-contain"
            />
          </div>

          <div className="space-y-2 w-full">
            <p className="text-sm text-slate-500">Escaneie o QR Code ou copie o código abaixo:</p>
            
            {/* Campo Copia e Cola */}
            <div className="flex items-center gap-2 bg-slate-100 p-3 rounded-lg border overflow-hidden">
              <code className="text-xs truncate flex-1 text-left font-mono">
                {pixCode}
              </code>
              <Button size="sm" variant="ghost" onClick={handleCopy} className="shrink-0">
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button onClick={onClose} className="w-full bg-green-600 hover:bg-green-700">
            Já realizei o pagamento
          </Button>
          <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
            <ShieldCheck size={12} /> Pagamento processado com segurança pela Yampi
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};