# 1Fi SDE1 Assignment

A database-backed smartphone EMI product browsing flow built with React, TypeScript, Express, Prisma, and PostgreSQL.

## Architecture

- `frontend/`: Vite React application with product listing and product detail routes.
- `backend/`: Express REST API with validation, service/controller layers, and Prisma.
- `backend/prisma/`: PostgreSQL schema, migration history, and seed data.
- Data flow: React service layer -> Express route -> controller -> service -> Prisma -> PostgreSQL.

## Requirements

- Node.js 20 or newer
- PostgreSQL 14 or newer
- npm

## Local setup

```bash
npm install
cp backend/.env.example backend/.env
```

Update `backend/.env` with a reachable PostgreSQL database:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/onefi_sde1?schema=public"
PORT=4000
FRONTEND_URL="http://localhost:5173"
NODE_ENV=development
```

Then create the schema and sample data:

```bash
npm run db:generate --workspace backend
npm run db:migrate --workspace backend -- --name init
npm run db:seed --workspace backend
```

Run the applications in separate terminals:

```bash
npm run dev:backend
npm run dev:frontend
```

Open http://localhost:5173. The API health check is available at http://localhost:4000/health.

## API

- `GET /health`
- `GET /api/products`
- `GET /api/products/:id`
- `GET /api/products/slug/:slug`

Successful product responses include variants. Product detail responses include each variant's EMI plans. Product and EMI data is read from PostgreSQL; the frontend does not contain production product records.

## Verification

```bash
npm run lint:backend
npm run lint:frontend
npm run build:backend
npm run build:frontend
npm run test:backend
npm run test:frontend
```

Backend tests use the configured database for API integration coverage. Frontend tests mock only the API service boundary.

## Demo flow

1. Open the home page and confirm products load from the API.
2. Select `View Product` for a phone.
3. Switch between color/storage variants using the thumbnails or variant controls.
4. Select an EMI tenure and confirm the monthly payment, interest, and cashback values update.
5. Select `Proceed` and verify the confirmation dialog summarizes the chosen product, variant, and plan.
6. Visit `/health` or an invalid product URL to demonstrate API and error states.

## Deployment readiness

### Database

Use Neon, Supabase, or another managed PostgreSQL provider. Set `DATABASE_URL` in the backend deployment environment and run Prisma migrations during release:

```bash
npx prisma migrate deploy
```

Seed only a non-production/demo database with `npm run db:seed --workspace backend`.

### Backend

Deploy `backend/` to Render or a comparable Node host. Because the TypeScript compiler and Node type definitions are development dependencies, use this Render configuration:

```text
Root Directory: backend
Build Command: npm install --include=dev && npx prisma generate && npx prisma migrate deploy && npm run build
Start Command: npm run start (runs `node dist/src/server.js`)
```

Configure `DATABASE_URL`, `PORT`, `FRONTEND_URL`, and `NODE_ENV` as environment variables. `--include=dev` is required when the host sets production dependency mode during the build; otherwise `tsc` cannot find `@types/node`.

### Frontend

Deploy `frontend/` to Vercel or a comparable static host. Configure `VITE_API_BASE_URL` to the deployed API base URL, for example `https://api.example.com/api`, then build with `npm run build`.





