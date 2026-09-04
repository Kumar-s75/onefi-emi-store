import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductBySlug } from '../services/productService';
import type { Product, ProductVariant } from '../types/product';
import { formatInr } from '../utils/currency';
import ProductGallery from '../components/ProductGallery';
import VariantSelector from '../components/VariantSelector';
import EmiPlanList from '../components/EmiPlanList';
import ConfirmationDialog from '../components/ConfirmationDialog';
import ProductPageSkeleton from '../components/ProductPageSkeleton';

function ProductPage() {
  const { slug } = useParams();
  const productSlug = slug ?? '';
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (!productSlug) {
      return;
    }

    let ignore = false;

    async function loadProduct() {
      try {
        const result = await getProductBySlug(productSlug);
        if (!ignore) {
          setProduct(result);
          setError(null);
          if (result.variants.length > 0) {
            setSelectedVariantId(result.variants[0].id);
            setSelectedPlanId(result.variants[0].emiPlans[0]?.id ?? '');
          }
        }
      } catch {
        if (!ignore) {
          setError('This product could not be found.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    void loadProduct();

    return () => {
      ignore = true;
    };
  }, [productSlug]);

  const selectedVariant = useMemo(
    () => product?.variants.find((variant) => variant.id === selectedVariantId) ?? product?.variants[0],
    [product, selectedVariantId],
  );

  const selectedPlan = useMemo(
    () => selectedVariant?.emiPlans.find((plan) => plan.id === selectedPlanId) ?? selectedVariant?.emiPlans[0] ?? null,
    [selectedPlanId, selectedVariant],
  );

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariantId(variant.id);
    setSelectedPlanId(variant.emiPlans[0]?.id ?? '');
  };

  if (loading) {
    return <ProductPageSkeleton />;
  }

  if (!productSlug || error || !product || !selectedVariant) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="rounded-2xl bg-white p-8 text-center shadow-soft">
          <h1 className="text-2xl font-bold text-slate-900">Product unavailable</h1>
          <p className="mt-3 text-slate-600">{error ?? (!productSlug ? 'Product slug is missing.' : 'We could not load this product.')}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 lg:p-8">
      <div className="mx-auto max-w-6xl rounded-[32px] bg-white p-4 shadow-soft ring-1 ring-slate-200 lg:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <ProductGallery product={product} selectedVariant={selectedVariant} onVariantChange={handleVariantChange} />

          <section className="space-y-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Smartphone EMI</p>
              <h1 className="mt-3 text-3xl font-bold text-slate-900 lg:text-4xl">{product.name}</h1>
            </div>

            <VariantSelector variants={product.variants} selectedVariantId={selectedVariant.id} onChange={handleVariantChange} />

            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-slate-900">{formatInr(selectedVariant.sellingPrice)}</span>
                <span className="text-lg text-slate-400 line-through">{formatInr(selectedVariant.mrp)}</span>
              </div>
              <p className="text-sm text-slate-600">{selectedVariant.finish ? `${selectedVariant.finish} finish` : 'Premium finish'} • {selectedVariant.storage ?? 'Standard'} storage</p>
            </div>

            <EmiPlanList plans={selectedVariant.emiPlans} selectedPlanId={selectedPlan?.id ?? ''} onChange={setSelectedPlanId} />

            <button
              type="button"
              disabled={!selectedPlan}
              onClick={() => setShowConfirmation(true)}
              className="w-full rounded-full bg-slate-900 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Proceed
            </button>
          </section>
        </div>
      </div>

      {showConfirmation && selectedPlan ? (
        <ConfirmationDialog product={product} variant={selectedVariant} plan={selectedPlan} onClose={() => setShowConfirmation(false)} />
      ) : null}
    </main>
  );
}

export default ProductPage;
