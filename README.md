# WonderPay

WonderPay is a private bill-pay and payments automation platform focused on streamlining AP/AR and offering working capital solutions for clients, partners, and colleagues in music, entertainment, and luxury hospitality industries.

## Tech Stack

- **Language**: TypeScript
- **Framework**: Next.js (App Router)
- **Database**: PostgreSQL via Prisma and Zenstack
- **Auth**: NextAuth
- **UI Kit**: Ant Design
- **Backend-to-Frontend communication**: tRPC
- **API Integration**: Monite API

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables in `.env.local`:
   ```
   NEXT_PUBLIC_MONITE_API_URL=https://api.sandbox.monite.com/v1
   NEXT_PUBLIC_MONITE_VERSION=2024-01-31
   DATABASE_URL="postgresql://..."
   ```

4. Initialize the database:
   ```bash
   npx prisma migrate dev
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- `/src/app` - Next.js App Router pages
- `/src/core` - Database migrations, CORS config
- `/src/designSystem` - Custom theme overrides, Layout components
- `/src/server` - Custom endpoints and integration logic
- `/models` - Data models and schema definitions
