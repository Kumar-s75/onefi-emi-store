import type { ProductVariant } from '../types/product';

type VariantSelectorProps = {
  variants: ProductVariant[];
  selectedVariantId: string;
  onChange: (variant: ProductVariant) => void;
};

function VariantSelector({ variants, selectedVariantId, onChange }: VariantSelectorProps) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
      <p className="text-sm font-medium text-slate-500">Selected variant</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {variants.map((variant) => (
          <button
            key={variant.id}
            type="button"
            onClick={() => onChange(variant)}
            aria-pressed={selectedVariantId === variant.id}
            className={`rounded-full border px-3 py-2 text-sm font-medium transition ${
              selectedVariantId === variant.id
                ? 'border-brand-600 bg-brand-50 text-brand-700'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
            }`}
          >
            {variant.color} {variant.storage ?? ''}
          </button>
        ))}
      </div>
    </div>
  );
}

export default VariantSelector;
