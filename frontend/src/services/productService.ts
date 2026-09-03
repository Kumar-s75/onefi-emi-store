import type { Product, ProductDetailResponse, ProductListResponse } from '../types/product';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api';

async function request<T>(url: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${url}`);

  if (!response.ok) {
    throw new Error('Unable to load product data');
  }

  return response.json() as Promise<T>;
}

export async function getProducts(): Promise<Product[]> {
  const result = await request<ProductListResponse>('/products');
  return result.data;
}

export async function getProductBySlug(slug: string): Promise<Product> {
  const result = await request<ProductDetailResponse>(`/products/slug/${slug}`);
  return result.data;
}
