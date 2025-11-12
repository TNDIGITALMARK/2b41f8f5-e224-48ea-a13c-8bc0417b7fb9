export interface Category {
  id: string;
  tenantid: string;
  projectid: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  tenantid: string;
  projectid: string;
  category_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  original_price: number | null;
  brand: string | null;
  sizes: string[];
  colors: { name: string; hex: string }[];
  images: string[];
  featured: boolean;
  in_stock: boolean;
  stock_quantity: number;
  rating: number;
  review_count: number;
  tags: string[];
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}
