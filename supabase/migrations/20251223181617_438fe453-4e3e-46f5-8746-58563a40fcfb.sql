-- Products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  image TEXT,
  category TEXT NOT NULL,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Partner leads table
CREATE TABLE public.partner_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  cnpj TEXT,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  cep TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  items JSONB NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  shipping_price DECIMAL(10,2) DEFAULT 0,
  shipping_address JSONB,
  payment_method TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Products: everyone can read
CREATE POLICY "Products are viewable by everyone" ON public.products FOR SELECT USING (true);

-- Partner leads: anyone can insert
CREATE POLICY "Anyone can submit partner lead" ON public.partner_leads FOR INSERT WITH CHECK (true);

-- Orders: users can manage their own
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);