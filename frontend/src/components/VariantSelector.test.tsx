import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import VariantSelector from './VariantSelector';

const variants = [
  {
    id: 'variant-silver',
    productId: 'product-1',
    color: 'Silver',
    storage: '256GB',
    finish: 'Titanium',
    mrp: '127400',
    sellingPrice: '119900',
    imageUrl: 'https://example.com/silver.jpg',
    emiPlans: [],
  },
  {
    id: 'variant-orange',
    productId: 'product-1',
    color: 'Orange',
    storage: '256GB',
    finish: 'Titanium',
    mrp: '127400',
    sellingPrice: '119900',
    imageUrl: 'https://example.com/orange.jpg',
    emiPlans: [],
  },
];

describe('VariantSelector', () => {
  it('emits the selected variant', () => {
    const onChange = vi.fn();
    render(<VariantSelector variants={variants} selectedVariantId="variant-silver" onChange={onChange} />);

    fireEvent.click(screen.getByRole('button', { name: 'Orange 256GB' }));

    expect(onChange).toHaveBeenCalledWith(variants[1]);
  });
});
