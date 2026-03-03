import { useState } from 'react';
import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react';
import { supabase } from '@/integrations-supabase/client';

// Inicializa o SDK com a chave pública do .env
initMercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY, { locale: 'pt-BR' });

export function CheckoutCartao({ totalAmount, externalReference }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const initialization = {
    amount: totalAmount, 
  };

  const onSubmit = async (formData: any, additionalData: any) => {
    setIsProcessing(true);
    
    return new Promise((resolve, reject) => {
      const submitData = {
        type: "online",
        total_amount: String(formData.transaction_amount),
        external_reference: externalReference, 
        processing_mode: "automatic",
        transactions: {
          payments: [
            {
              amount: String(formData.transaction_amount),
              payment_method: {
                id: formData.payment_method_id,
                type: additionalData?.paymentTypeId || "credit_card",
                token: formData.token,
                installments: formData.installments,
              },
            },
          ],
        },
        payer: {
          email: formData.payer.email,
          identification: formData.payer.identification,
        },
      };

      // Envia o payload para a sua função segura no Supabase
      supabase.functions.invoke('process-card-payment', {
        body: submitData
      })
      .then(({ data, error }) => {
        setIsProcessing(false);
        if (error) throw error;
        
        console.log("Pagamento processado com sucesso!", data);
        resolve(data);
        
        // Aqui você pode redirecionar o usuário:
        // window.location.href = `/sucesso?id=${data.id}`;
      })
      .catch((error) => {
        setIsProcessing(false);
        console.error("Erro ao processar pagamento:", error);
        reject(error);
      });
    });
  };

  const onError = async (error: any) => {
    console.error("Erro no CardPayment Brick:", error);
  };

  const onReady = async () => {
    console.log("Brick renderizado e pronto para uso.");
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-4 rounded-xl shadow-sm">
      {isProcessing && <div className="text-center text-sm text-gray-500 mb-4">Processando seu pagamento...</div>}
      <CardPayment
        initialization={initialization}
        onSubmit={onSubmit}
        onReady={onReady}
        onError={onError}
      />
    </div>
  );
}