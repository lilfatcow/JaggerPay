# JaggerPay (formerly WonderPay)

JaggerPay is a private bill-pay and payments automation platform focused on streamlining AP/AR and offering working capital solutions for clients, partners, and colleagues in music, entertainment, and luxury hospitality industries.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL via Prisma and Zenstack
- **Authentication**: NextAuth.js
- **UI**: Ant Design (planned migration to shadcn/ui)
- **API Layer**: tRPC
- **Payment Processing**: Monite API

## Project Structure

```
jaggerpay/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── (authenticated)/      # Protected routes
│   │   ├── (non-authenticated)/  # Public routes
│   │   ├── api/                  # API routes
│   │   └── layout.tsx           # Root layout
│   ├── components/              # Shared components
│   │   ├── ui/                  # UI components
│   │   └── layout/              # Layout components
│   ├── server/                  # Server-side code
│   │   ├── routers/            # tRPC routers
│   │   ├── services/           # External services
│   │   └── db.ts              # Database configuration
│   └── utils/                  # Utility functions
├── prisma/                     # Database schema
└── public/                     # Static assets
```

## Getting Started

### Prerequisites
- Node.js >= 18.0.0 (required for Next.js 14)
- npm >= 8.0.0 (package-lock.json version 3)
- PostgreSQL 12 or later
- Git

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/lilfatcow/JaggerPay.git
   cd JaggerPay
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/jaggerpay"

   # NextAuth
   NEXTAUTH_SECRET="your-secret-here"
   NEXTAUTH_URL="http://localhost:3000"

   # Monite API
   NEXT_PUBLIC_MONITE_API_URL=https://api.sandbox.monite.com/v1
   NEXT_PUBLIC_MONITE_VERSION=2024-01-31
   MONITE_API_KEY=your_monite_api_key
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run migrations
   npx prisma migrate dev
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

   Visit [http://localhost:3000](http://localhost:3000)

## Authentication

JaggerPay uses NextAuth.js for authentication. Here's how it's implemented:

### Setup

1. **Configuration**
   ```typescript
   // src/app/api/auth/[...nextauth]/route.ts
   import NextAuth from "next-auth";
   import CredentialsProvider from "next-auth/providers/credentials";

   export const authOptions = {
     providers: [
       CredentialsProvider({
         // Configuration
       }),
     ],
     callbacks: {
       // Custom callbacks
     },
   };

   const handler = NextAuth(authOptions);
   export { handler as GET, handler as POST };
   ```

2. **Protected Routes**
   ```typescript
   // src/app/(authenticated)/layout.tsx
   import { getServerSession } from "next-auth/next";
   import { redirect } from "next/navigation";

   export default async function Layout({
     children,
   }: {
     children: React.ReactNode;
   }) {
     const session = await getServerSession();
     if (!session) {
       redirect("/login");
     }
     return <>{children}</>;
   }
   ```

## API Layer

JaggerPay uses tRPC for type-safe API communication between the client and server.

### Router Setup

```typescript
// src/server/routers/invoice.ts
import { router, protectedProcedure } from '../trpc';

export const invoiceRouter = router({
  getAll: protectedProcedure
    .query(async ({ ctx }) => {
      return ctx.prisma.invoice.findMany({
        where: { userId: ctx.session.user.id },
      });
    }),
  
  create: protectedProcedure
    .input(invoiceSchema)
    .mutation(async ({ ctx, input }) => {
      // Implementation
    }),
});
```

### Client Usage

```typescript
// src/app/(authenticated)/invoices/page.tsx
import { trpc } from "@/utils/trpc";

export default function InvoicesPage() {
  const { data: invoices } = trpc.invoice.getAll.useQuery();
  
  return (
    // Implementation
  );
}
```

## Error Handling

```typescript
// src/utils/error-handler.ts
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string
  ) {
    super(message);
  }
}

// Usage in API routes
if (!session) {
  throw new ApiError(401, "UNAUTHORIZED", "Not authenticated");
}
```

## Deployment

1. **Database Migration**
   ```bash
   npx prisma migrate deploy
   ```

2. **Build Application**
   ```bash
   npm run build
   ```

3. **Start Production Server**
   ```bash
   npm start
   ```

### Deployment Platforms

- **Vercel** (Recommended)
  - Connect your GitHub repository
  - Add environment variables
  - Deploy automatically

- **Railway**
  - Provides PostgreSQL database
  - Easy environment setup
  - Automatic deployments

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is private and proprietary. All rights reserved.

## Support

For support, please contact [support email/contact].
