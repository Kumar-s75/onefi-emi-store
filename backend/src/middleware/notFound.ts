import type { NextFunction, Request, Response } from 'express';
import { AppError } from './errorHandler.js';

export function notFoundHandler(_req: Request, _res: Response, next: NextFunction) {
  next(new AppError('Route not found', 404));
}
