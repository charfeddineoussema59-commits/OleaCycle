-- OleaCycle Supabase SQL Schema
-- This schema establishes our Core Architecture: 
-- Profiles (Roles), Products, Quote Requests for B2B, Orders for B2C

-- 1. Custom Types
CREATE TYPE user_role AS ENUM ('B2C', 'B2B', 'ADMIN');

-- 2. Profiles Table (extends Supabase Auth)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role user_role DEFAULT 'B2C'::user_role NOT NULL,
  first_name TEXT,
  last_name TEXT,
  company_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Products Table
CREATE TABLE public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  base_price DECIMAL(10, 2) NOT NULL,
  b2b_min_order INT DEFAULT 100,
  stock_quantity INT DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 4. B2B Quote Requests Table
CREATE TABLE public.quote_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL, -- Null if guest requested
  company_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  estimated_volume TEXT NOT NULL,
  requirements_details TEXT,
  status TEXT DEFAULT 'PENDING' NOT NULL, -- PENDING, IN_REVIEW, FULFILLED, REJECTED
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- 5. Establish RLS Policies
-- Profiles: Users can view their own profile. Admins can view all.
CREATE POLICY "Users can view own profile." ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile." ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

-- Products: Everyone can read products. Only admins can insert/update.
CREATE POLICY "Products are viewable by everyone." ON products FOR SELECT USING (true);
CREATE POLICY "Only admins can modify products." ON products FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'ADMIN')
);

-- Quotes: Admins can view all. Users can insert. Users can view their own based on email/profile.
CREATE POLICY "Anyone can insert a quote." ON quote_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own quotes." ON quote_requests FOR SELECT USING (
  auth.uid() = profile_id OR 
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'ADMIN')
);
