import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from "npm:stripe@^14.0.0"
import { createClient } from "npm:@supabase/supabase-js@^2.39.0"

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

serve(async (req) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  if (req.method === 'OPTIONS') return new Response('ok', { headers });

  try {
    const { loja_id, email } = await req.json();

    if (!loja_id) throw new Error("ID da loja é obrigatório.");

    // 1. Inicia o cliente Supabase com privilégios para atualizar a tabela
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // 2. Verifica se a loja já tem uma conta Stripe
    const { data: loja, error: lojaError } = await supabaseAdmin
      .from('lojas') // Apontando para a sua tabela "lojas"
      .select('stripe_account_id')
      .eq('id', loja_id)
      .single();

    if (lojaError) throw new Error("Erro ao buscar a loja no banco de dados.");

    let accountId = loja?.stripe_account_id;

    // 3. Se não tem, cria a conta na Stripe (Tipo Express)
    if (!accountId) {
      const account = await stripe.accounts.create({
        type: 'express',
        country: 'BR',
        email: email,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true }, // Permite os repasses (split)
        },
      });

      accountId = account.id;

      // 4. Salva o ID gerado (acct_...) na tabela 'lojas'
      await supabaseAdmin
        .from('lojas')
        .update({ stripe_account_id: accountId })
        .eq('id', loja_id);
    }

    // 5. Gera o link seguro para o Lojista preencher os dados bancários
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${req.headers.get('origin')}/dashboard-loja`, // Para onde vai se ele cancelar
      return_url: `${req.headers.get('origin')}/dashboard-loja?sucesso=true`, // Para onde vai quando terminar
      type: 'account_onboarding',
    });

    // Devolve o link da Stripe para o React
    return new Response(JSON.stringify({ url: accountLink.url }), {
      headers: { ...headers, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error: any) {
    console.error("Erro na criação de conta Stripe:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...headers, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
})