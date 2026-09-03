import { z } from 'zod';

export const slugParamSchema = z.object({
  slug: z.string().trim().min(1, 'Slug is required'),
});

export const productIdSchema = z.object({
  id: z.string().trim().min(1, 'Product ID is required'),
});
