import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductBySlug } from '../services/productService';
import type { Product, ProductVariant, EmiPlan } from '../types/product';
import { formatInr } from '../utils/currency';

function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (!slug) {
      setError('Product slug is missing.');
      setLoading(false);
      return;
    }

    let ignore = false;

    async function loadProduct() {
      try {
        const result = await getProductBySlug(slug);
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
  }, [slug]);

  const selectedVariant = useMemo(
    () => product?.variants.find((variant) => variant.id === selectedVariantId) ?? product?.variants[0],
    [product, selectedVariantId],
  );

  const selectedPlan = useMemo(
    () => selectedVariant?.emiPlans.find((plan) => plan.id === selectedPlanId) ?? selectedVariant?.emiPlans[0] ?? null,
    [selectedPlanId, selectedVariant],
  );

  useEffect(() => {
    if (!selectedVariant) return;
    if (selectedPlan && selectedVariant.emiPlans.some((plan) => plan.id === selectedPlan.id)) {
      return;
    }
    setSelectedPlanId(selectedVariant.emiPlans[0]?.id ?? '');
  }, [selectedPlan, selectedVariant]);

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariantId(variant.id);
    setSelectedPlanId(variant.emiPlans[0]?.id ?? '');
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-6xl animate-pulse rounded-3xl bg-white p-8 shadow-soft">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <div className="h-[420px] rounded-3xl bg-slate-200" />
              <div className="grid grid-cols-3 gap-3">
                <div className="h-20 rounded-2xl bg-slate-200" />
                <div className="h-20 rounded-2xl bg-slate-200" />
                <div className="h-20 rounded-2xl bg-slate-200" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-8 w-32 rounded bg-slate-200" />
              <div className="h-12 w-3/4 rounded bg-slate-200" />
              <div className="h-8 w-32 rounded bg-slate-200" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !product || !selectedVariant) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="rounded-2xl bg-white p-8 text-center shadow-soft">
          <h1 className="text-2xl font-bold text-slate-900">Product unavailable</h1>
          <p className="mt-3 text-slate-600">{error ?? 'We could not load this product.'}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 lg:p-8">
      <div className="mx-auto max-w-6xl rounded-[32px] bg-white p-4 shadow-soft ring-1 ring-slate-200 lg:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section>
            <div className="overflow-hidden rounded-[28px] bg-slate-100">
              <img
                src={selectedVariant.imageUrl}
                alt={`${product.name} ${selectedVariant.color} variant`}
                className="h-[420px] w-full object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  type="button"
                  className={`overflow-hidden rounded-2xl border bg-slate-50 p-1 text-left transition ${
                    variant.id === selectedVariant.id ? 'border-brand-500 ring-2 ring-brand-100' : 'border-slate-200 hover:border-slate-300'
                  }`}
                  onClick={() => handleVariantChange(variant)}
                  aria-label={`Select ${variant.color} ${variant.storage ?? ''}`}
                >
                  <img src={variant.imageUrl} alt={`${variant.color} ${product.name}`} className="h-20 w-full rounded-xl object-cover" />
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Smartphone EMI</p>
              <h1 className="mt-3 text-3xl font-bold text-slate-900 lg:text-4xl">{product.name}</h1>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <p className="text-sm font-medium text-slate-500">Selected variant</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => handleVariantChange(variant)}
                    className={`rounded-full border px-3 py-2 text-sm font-medium transition ${
                      selectedVariant.id === variant.id
                        ? 'border-brand-600 bg-brand-50 text-brand-700'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {variant.color} {variant.storage ?? ''}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-slate-900">{formatInr(selectedVariant.sellingPrice)}</span>
                <span className="text-lg text-slate-400 line-through">{formatInr(selectedVariant.mrp)}</span>
              </div>
              <p className="text-sm text-slate-600">{selectedVariant.finish ? `${selectedVariant.finish} finish` : 'Premium finish'} • {selectedVariant.storage ?? 'Standard'} storage</p>
            </div>

            <div className="rounded-3xl border border-slate-200 p-4">
              <h2 className="text-lg font-semibold text-slate-900">Select EMI plan</h2>
              <div className="mt-4 space-y-3">
                {selectedVariant.emiPlans.length === 0 ? (
                  <p className="text-sm text-slate-500">No EMI plans are available for this variant.</p>
                ) : (
                  selectedVariant.emiPlans.map((plan: EmiPlan) => {
                    const isSelected = plan.id === selectedPlan?.id;
                    return (
                      <label
                        key={plan.id}
                        className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition ${
                          isSelected ? 'border-brand-600 bg-brand-50 ring-2 ring-brand-100' : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="emi-plan"
                            checked={isSelected}
                            onChange={() => setSelectedPlanId(plan.id)}
                            className="h-4 w-4 accent-brand-600"
                            aria-label={`Select EMI plan for ${plan.tenureMonths} months`}
                          />
                          <div>
                            <div className="font-semibold text-slate-900">₹{Number(plan.monthlyPayment).toLocaleString('en-IN')} × {plan.tenureMonths} months</div>
                            <div className="text-sm text-slate-600">{plan.interestRate}% interest</div>
                            {plan.cashback ? (
                              <div className="mt-1 text-sm text-emerald-700">Additional cashback ₹{Number(plan.cashback).toLocaleString('en-IN')}</div>
                            ) : null}
                          </div>
                        </div>
                        <span className="text-xs font-medium uppercase tracking-wide text-slate-500">{plan.tenureMonths} mo</span>
                      </label>
                    );
                  })
                )}
              </div>
            </div>

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Demo confirmation</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">Proceed with this plan</h2>
              </div>
              <button type="button" onClick={() => setShowConfirmation(false)} className="text-xl text-slate-500">×</button>
            </div>

            <div className="mt-5 space-y-3 text-sm text-slate-700">
              <div className="flex justify-between gap-3"><span>Product</span><strong className="text-slate-900">{product.name}</strong></div>
              <div className="flex justify-between gap-3"><span>Variant</span><strong className="text-slate-900">{selectedVariant.color} {selectedVariant.storage ?? ''}</strong></div>
              <div className="flex justify-between gap-3"><span>Monthly EMI</span><strong className="text-slate-900">{formatInr(selectedPlan.monthlyPayment)}</strong></div>
              <div className="flex justify-between gap-3"><span>Tenure</span><strong className="text-slate-900">{selectedPlan.tenureMonths} months</strong></div>
              <div className="flex justify-between gap-3"><span>Interest</span><strong className="text-slate-900">{selectedPlan.interestRate}%</strong></div>
              <div className="flex justify-between gap-3"><span>Cashback</span><strong className="text-slate-900">{selectedPlan.cashback ? formatInr(selectedPlan.cashback) : 'None'}</strong></div>
            </div>

            <button
              type="button"
              onClick={() => setShowConfirmation(false)}
              className="mt-6 w-full rounded-full bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}

export default ProductPage;
