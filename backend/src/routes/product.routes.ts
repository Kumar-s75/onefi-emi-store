import { Router } from 'express';
import { getProductByIdController, getProductBySlugController, getProductsController } from '../controllers/product.controller.js';
import { productIdSchema, slugParamSchema } from '../validators/product.validator.js';
import { AppError } from '../middleware/errorHandler.js';

const router = Router();

router.get('/products', getProductsController);
router.get('/products/:id', (req, res, next) => {
  const parsed = productIdSchema.safeParse(req.params);
  if (!parsed.success) {
    return next(new AppError(parsed.error.issues[0]?.message ?? 'Invalid product id', 400));
  }
  return getProductByIdController(req, res, next);
});
router.get('/products/slug/:slug', (req, res, next) => {
  const parsed = slugParamSchema.safeParse(req.params);
  if (!parsed.success) {
    return next(new AppError(parsed.error.issues[0]?.message ?? 'Invalid slug', 400));
  }
  return getProductBySlugController(req, res, next);
});

export default router;
