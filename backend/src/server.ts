import { app } from './app.js';
import { prisma } from './lib/prisma.js';

const port = Number(process.env.PORT ?? 4000);

const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

async function shutdown(signal: string) {
  console.log(`${signal} received, shutting down gracefully`);

  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.once('SIGTERM', () => void shutdown('SIGTERM'));
process.once('SIGINT', () => void shutdown('SIGINT'));
