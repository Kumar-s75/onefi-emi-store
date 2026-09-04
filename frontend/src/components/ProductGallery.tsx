import type { Product, ProductVariant } from '../types/product';

type ProductGalleryProps = {
  product: Product;
  selectedVariant: ProductVariant;
  onVariantChange: (variant: ProductVariant) => void;
};

function ProductGallery({ product, selectedVariant, onVariantChange }: ProductGalleryProps) {
  return (
    <section aria-label="Product images">
      <div className="overflow-hidden rounded-[28px] bg-slate-100">
        <img
          src={selectedVariant.imageUrl}
          alt={`${product.name} ${selectedVariant.color} variant`}
          className="h-[420px] w-full object-cover"
          onError={(event) => {
            event.currentTarget.src = product.variants[0]?.imageUrl ?? '';
          }}
        />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {product.variants.map((variant) => (
          <button
            key={variant.id}
            type="button"
            className={`overflow-hidden rounded-2xl border bg-slate-50 p-1 text-left transition ${
              variant.id === selectedVariant.id
                ? 'border-brand-500 ring-2 ring-brand-100'
                : 'border-slate-200 hover:border-slate-300'
            }`}
            onClick={() => onVariantChange(variant)}
            aria-label={`Select ${variant.color} ${variant.storage ?? ''}`}
            aria-pressed={variant.id === selectedVariant.id}
          >
            <img
              src={variant.imageUrl}
              alt={`${variant.color} ${product.name}`}
              className="h-20 w-full rounded-xl object-cover"
              onError={(event) => {
                event.currentTarget.src = product.variants[0]?.imageUrl ?? '';
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

export default ProductGallery;
