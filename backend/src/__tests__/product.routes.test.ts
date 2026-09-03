import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../app.js';

describe('product API', () => {
  it('checks health endpoint', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ ok: true, message: 'API is healthy' });
  });

  it('lists products from the database', async () => {
    const response = await request(app).get('/api/products');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.data[0]).toHaveProperty('slug');
  });

  it('fetches a product by slug', async () => {
    const response = await request(app).get('/api/products/slug/iphone-17-pro');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.slug).toBe('iphone-17-pro');
    expect(Array.isArray(response.body.data.variants)).toBe(true);
        expect(response.body.data.variants[0].emiPlans).toHaveLength(7);
        expect(response.body.data.variants[0].emiPlans.map((plan: { tenureMonths: number }) => plan.tenureMonths)).toEqual([
          3, 6, 12, 24, 36, 48, 60,
        ]);
  });
});
