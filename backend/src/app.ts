import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import productRoutes from './routes/product.routes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFound.js';

export const app = express();
const allowedOrigin = process.env.FRONTEND_URL ?? 'http://localhost:5173';

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  }),
);
app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req, res) => {
  res.json({ ok: true, message: 'API is healthy' });
});

app.use('/api', productRoutes);

app.use(notFoundHandler);
app.use(errorHandler);
