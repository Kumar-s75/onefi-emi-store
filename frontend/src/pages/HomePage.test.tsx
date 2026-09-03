import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import HomePage from './HomePage';

vi.mock('../services/productService', () => ({
  getProducts: vi.fn().mockResolvedValue([
    {
      id: 'product-1',
      slug: 'iphone-17-pro',
      name: 'iPhone 17 Pro',
      description: 'Premium flagship',
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
      variants: [
        {
          id: 'variant-1',
          productId: 'product-1',
          color: 'Silver',
          storage: '256GB',
          finish: 'Titanium',
          mrp: '127400',
          sellingPrice: '119900',
          imageUrl: 'https://example.com/iphone.jpg',
          createdAt: '2026-01-01T00:00:00.000Z',
          updatedAt: '2026-01-01T00:00:00.000Z',
          emiPlans: [],
        },
      ],
    },
  ]),
}));

describe('HomePage', () => {
  it('renders products returned by the API', async () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('iPhone 17 Pro')).toBeInTheDocument();
    });

    expect(screen.getByRole('link', { name: /view product/i })).toHaveAttribute('href', '/products/iphone-17-pro');
  });
});
