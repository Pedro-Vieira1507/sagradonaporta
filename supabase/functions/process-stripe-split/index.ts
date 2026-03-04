import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from "npm:stripe@^14.0.0"

// Inicializa o cliente da Stripe com a sua Chave Secreta
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2022-11-15',
  httpClient: Stripe.createFetchHttpClient(),
});

serve(async (req) => {
  // Configuração padrão de CORS para o React conseguir acessar a função
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  if (req.method === 'OPTIONS') return new Response('ok', { headers });

  try {
    const { amount, seller_stripe_account_id, platform_fee_percent, paymentMethod } = await req.json();

    if (!seller_stripe_account_id) {
      throw new Error("O ID da conta Stripe do vendedor é obrigatório para o Split.");
    }

    // A Stripe sempre trabalha com a menor unidade da moeda (centavos no caso do BRL)
    // Ex: R$ 50,00 vira 5000
    const totalAmountInCents = Math.round(amount * 100);
    
    // Calcula a sua comissão (Fee da Plataforma)
    const feeInCents = Math.round(totalAmountInCents * (platform_fee_percent / 100));

    // FLUXO 1: CARTÃO DE CRÉDITO
    if (paymentMethod === 'credit_card') {
      // Criamos a "Intenção de Pagamento" (mas não cobramos ainda, o Front-end faz isso)
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmountInCents,
        currency: 'brl',
        payment_method_types: ['card'],
         application_fee_amount: feeInCents, // Sua comissão
         transfer_data: {
          destination: seller_stripe_account_id, // O resto vai para o lojista
        },
      });

      // Devolvemos o "segredo" para o front-end confirmar o cartão com segurança
      return new Response(JSON.stringify({ 
        clientSecret: paymentIntent.client_secret 
      }), { headers, status: 200 });
    } 
    
    // FLUXO 2: PAGAMENTO VIA PIX
    else if (paymentMethod === 'pix') {
      // Para o PIX, nós já "confirmamos" a intenção direto no servidor para gerar o QR Code
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmountInCents,
        currency: 'brl',
        payment_method_types: ['pix'],
        payment_method_data: { type: 'pix' },
        confirm: true, // Força a geração imediata
        application_fee_amount: feeInCents, // Sua comissão
        transfer_data: {
          destination: seller_stripe_account_id, // O resto vai para o lojista
        },
        return_url: 'https://sagradonaporta.com.br/pedido-confirmado', // Obrigatório na API, mesmo sendo PIX
      });

      // Extrai os dados do PIX gerados pela Stripe
      const pixAction = paymentIntent.next_action?.pix_display_qr_code;

      if (!pixAction) {
        throw new Error("A Stripe não retornou os dados do PIX. Verifique se o PIX está ativo na sua conta Stripe.");
      }

      // Devolvemos exatamente o que o seu PixModal precisa!
      return new Response(JSON.stringify({ 
        pixCode: pixAction.data, // O código "Copia e Cola"
        pixQrCode: pixAction.image_url_png // O link da imagem do QR Code
      }), { headers, status: 200 });
    } 
    
    else {
      throw new Error("Método de pagamento não suportado.");
    }

  } catch (error: any) {
    console.error("ERRO STRIPE:", error);
    return new Response(JSON.stringify({ error: error.message }), { headers, status: 400 });
  }
})