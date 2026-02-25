import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // 1. Lidar com requisições CORS (Preflight)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { formData, orderData } = await req.json()

    // 2. Credencial de Teste do Mercado Pago (Substitua pela sua real depois)
    // Para testar, você pode usar um Access Token de teste gerado no painel do desenvolvedor
    const MP_ACCESS_TOKEN = "TEST-6425313554165487-051814-xxxxxxxxxxxxxxxxxxxxxxxxxxxx" 

    // 3. Preparar o corpo da requisição para o Mercado Pago
    const paymentPayload = {
      transaction_amount: formData.transaction_amount,
      token: formData.token,
      description: `Pedido Sagrado na Porta - ${orderData.user_id}`,
      installments: formData.installments,
      payment_method_id: formData.payment_method_id,
      issuer_id: formData.issuer_id,
      payer: {
        email: formData.payer.email,
        identification: {
          type: formData.payer.identification.type,
          number: formData.payer.identification.number,
        },
      },
      // Chave de idempotência (evita cobranças duplicadas em erros de rede)
      external_reference: `${orderData.user_id}-${Date.now()}`,
    }

    // 4. Chamada para a API do Mercado Pago
    const response = await fetch('https://api.mercadopago.com/v1/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'X-Idempotency-Key': crypto.randomUUID(),
      },
      body: JSON.stringify(paymentPayload),
    })

    const result = await response.json()

    // 5. Retornar o resultado para o Frontend
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: response.status,
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})