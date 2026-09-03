export type EmiPlan = {
  id: string;
  variantId: string;
  tenureMonths: number;
  interestRate: number | string;
  monthlyPayment: string | number;
  cashback: string | number | null;
};

export type ProductVariant = {
  id: string;
  productId: string;
  color: string;
  storage?: string | null;
  finish?: string | null;
  mrp: string | number;
  sellingPrice: string | number;
  imageUrl: string;
  emiPlans: EmiPlan[];
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  variants: ProductVariant[];
};

export type ProductListResponse = {
  success: boolean;
  data: Product[];
};

export type ProductDetailResponse = {
  success: boolean;
  data: Product;
};
