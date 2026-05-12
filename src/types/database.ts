export type UserRole = 'B2C' | 'B2B' | 'ADMIN';

export interface Profile {
  id: string; // UUID from Supabase Auth
  role: UserRole;
  first_name: string | null;
  last_name: string | null;
  company_name: string | null;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string | null;
  base_price: number;
  b2b_min_order: number;
  stock_quantity: number;
  image_url: string | null;
  created_at: string;
}

export interface QuoteRequest {
  id: string;
  profile_id?: string | null;
  company_name: string;
  contact_email: string;
  estimated_volume: string;
  requirements_details: string | null;
  status: 'PENDING' | 'IN_REVIEW' | 'FULFILLED' | 'REJECTED';
  created_at: string;
}
