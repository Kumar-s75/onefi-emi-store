import { prisma } from '../lib/prisma.js';
import { AppError } from '../middleware/errorHandler.js';

export async function getAllProducts() {
  return prisma.product.findMany({
    orderBy: { createdAt: 'asc' },
    include: {
      variants: {
        orderBy: { createdAt: 'asc' },
      },
    },
  });
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      variants: {
        orderBy: { createdAt: 'asc' },
        include: {
          emiPlans: {
            orderBy: { tenureMonths: 'asc' },
          },
        },
      },
    },
  });

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  return product;
}

export async function getProductById(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      variants: {
        orderBy: { createdAt: 'asc' },
        include: {
          emiPlans: {
            orderBy: { tenureMonths: 'asc' },
          },
        },
      },
    },
  });

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  return product;
}
