import type { Product, ProductVariant, EmiPlan } from '../types/product';
import { formatInr } from '../utils/currency';

type ConfirmationDialogProps = {
  product: Product;
  variant: ProductVariant;
  plan: EmiPlan;
  onClose: () => void;
};

function ConfirmationDialog({ product, variant, plan, onClose }: ConfirmationDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-title"
        className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Demo confirmation</p>
            <h2 id="confirmation-title" className="mt-2 text-2xl font-bold text-slate-900">Proceed with this plan</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close confirmation dialog" className="text-xl text-slate-500">x</button>
        </div>
        <div className="mt-5 space-y-3 text-sm text-slate-700">
          <div className="flex justify-between gap-3"><span>Product</span><strong className="text-slate-900">{product.name}</strong></div>
          <div className="flex justify-between gap-3"><span>Variant</span><strong className="text-slate-900">{variant.color} {variant.storage ?? ''}</strong></div>
          <div className="flex justify-between gap-3"><span>Monthly EMI</span><strong className="text-slate-900">{formatInr(plan.monthlyPayment)}</strong></div>
          <div className="flex justify-between gap-3"><span>Tenure</span><strong className="text-slate-900">{plan.tenureMonths} months</strong></div>
          <div className="flex justify-between gap-3"><span>Interest</span><strong className="text-slate-900">{plan.interestRate}%</strong></div>
          <div className="flex justify-between gap-3"><span>Cashback</span><strong className="text-slate-900">{plan.cashback ? formatInr(plan.cashback) : 'None'}</strong></div>
        </div>
        <button type="button" onClick={onClose} className="mt-6 w-full rounded-full bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700">Close</button>
      </div>
    </div>
  );
}

export default ConfirmationDialog;
