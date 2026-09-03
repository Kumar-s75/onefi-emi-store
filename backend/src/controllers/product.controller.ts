import type { Request, Response, NextFunction } from 'express';
import { getAllProducts, getProductById, getProductBySlug } from '../services/product.service.js';

export async function getProductsController(_req: Request, res: Response, next: NextFunction) {
  try {
    const products = await getAllProducts();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
}

export async function getProductByIdController(req: Request, res: Response, next: NextFunction) {
  try {
    const productId = String(req.params.id ?? '');
    const product = await getProductById(productId);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
}

export async function getProductBySlugController(req: Request, res: Response, next: NextFunction) {
  try {
    const slug = String(req.params.slug ?? '');
    const product = await getProductBySlug(slug);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
}
