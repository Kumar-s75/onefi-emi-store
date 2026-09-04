import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';
import type { Product } from '../types/product';
import { formatInr } from '../utils/currency';

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadProducts() {
      try {
        const result = await getProducts();
        if (!ignore) {
          setProducts(result);
          setError(null);
        }
      } catch {
        if (!ignore) {
          setError('Unable to load products right now. Please try again later.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    void loadProducts();

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="animate-pulse rounded-3xl bg-white p-4 shadow-soft">
                <div className="h-64 rounded-2xl bg-slate-200" />
                <div className="mt-4 h-5 w-2/3 rounded bg-slate-200" />
                <div className="mt-3 h-4 w-1/2 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="rounded-2xl bg-white p-8 text-center shadow-soft">
          <h1 className="text-2xl font-bold text-slate-900">Products are unavailable</h1>
          <p className="mt-3 text-slate-600">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Smartphone financing</p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900">Choose the right phone</h1>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => {
            const firstVariant = product.variants[0];
            const startingPrice = firstVariant ? Number(firstVariant.sellingPrice) : 0;

            return (
              <article key={product.id} className="overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-slate-200">
                <img
                  src={firstVariant?.imageUrl}
                  alt={`${product.name} product image`}
                  className="h-72 w-full object-cover"
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.src = product.variants[0]?.imageUrl ?? '';
                  }}
                />
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-slate-900">{product.name}</h2>
                  <p className="mt-2 text-sm text-slate-600">From {formatInr(startingPrice)}</p>
                  <Link
                    to={`/products/${product.slug}`}
                    className="mt-5 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                  >
                    View Product
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default HomePage;
