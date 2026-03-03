import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  try {
    const body = await req.json();
    
    // 👇 TOKEN CHUMBADADO AQUI! Removi a verificação do Deno.env.get
    // Se a sua chave de teste for diferente dessa, pode trocar aqui dentro das aspas!
    const accessToken = "TEST-APP_USR-4644625805893108-022515-9d573bbe310811df83ca3218705de667-3226752041";

    const { formData, orderData } = body;

    if (!formData || !orderData) {
       return new Response(JSON.stringify({ success: false, mp_error: { message: "Dados incompletos" } }), { headers: corsHeaders, status: 200 });
    }

    const mpPayload: any = {
      transaction_amount: Number(orderData.amount),
      description: "Pedido Sagrado na Porta",
      external_reference: `ORDER-${orderData.user_id || 'GUEST'}-${Date.now()}`,
      installments: Number(formData.installments || 1),
      payment_method_id: formData.payment_method_id,
      payer: {
        email: formData.payer.email,
        identification: formData.payer.identification,
        first_name: formData.payer.first_name || "Cliente",
        last_name: formData.payer.last_name || "Sagrado"
      }
    };

    if (formData.token) mpPayload.token = formData.token;
    if (formData.issuer_id) mpPayload.issuer_id = formData.issuer_id;

    const response = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-Idempotency-Key": crypto.randomUUID()
      },
      body: JSON.stringify(mpPayload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("ERRO MP:", data);
      return new Response(JSON.stringify({ success: false, mp_error: data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200, 
      });
    }

    return new Response(JSON.stringify({ success: true, data: data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ success: false, mp_error: { message: error.message } }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  }
});