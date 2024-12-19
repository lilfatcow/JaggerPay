# JaggerPay (formerly WonderPay)

JaggerPay is a private bill-pay and payments automation platform focused on streamlining AP/AR and offering working capital solutions for clients, partners, and colleagues in music, entertainment, and luxury hospitality industries.

## Current Implementation (Next.js)

### Tech Stack

- **Language**: TypeScript
- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL via Prisma and Zenstack
- **Auth**: NextAuth
- **UI Kit**: Ant Design (planned migration to shadcn/ui)
- **Backend-to-Frontend communication**: tRPC
- **API Integration**: Monite API

### Project Structure

- `/src/app` - Next.js App Router pages and layouts
  - `/(authenticated)` - Protected routes requiring authentication
  - `/(non-authenticated)` - Public routes
  - `/api` - API routes including auth and tRPC
- `/src/core` - Core functionality
  - Database migrations
  - CORS configuration
  - Utility functions
- `/src/designSystem` - UI/UX related code
  - Theme configuration
  - Layout components
  - Shared UI components
- `/src/server` - Backend logic
  - tRPC routers
  - API integrations
  - Business logic
- `/models` - Data models and schema definitions
- `/prisma` - Database schema and migrations

### Getting Started with Next.js Version

1. **Prerequisites**
   - Node.js 18+ 
   - PostgreSQL 12+
   - npm or yarn

2. **Clone and Install**
   ```bash
   git clone https://github.com/lilfatcow/JaggerPay.git
   cd JaggerPay
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file:
   ```env
   # Monite API Configuration
   NEXT_PUBLIC_MONITE_API_URL=https://api.sandbox.monite.com/v1
   NEXT_PUBLIC_MONITE_VERSION=2024-01-31
   
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/jaggerpay"
   
   # NextAuth Configuration
   NEXTAUTH_SECRET="your-secret-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev
   ```

5. **Development**
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000

## Building with React + Vite (Alternative Frontend)

If you prefer to build the frontend separately using React + Vite, here's how to structure the project:

### Recommended Structure

```
jaggerpay-frontend/
├── src/
│   ├── assets/         # Static assets
│   ├── components/     # Reusable components
│   │   ├── ui/        # UI components
│   │   └── layout/    # Layout components
│   ├── features/      # Feature-based components
│   │   ├── auth/      # Authentication
│   │   ├── billing/   # Billing features
│   │   └── dashboard/ # Dashboard features
│   ├── hooks/         # Custom hooks
│   ├── services/      # API services
│   ├── store/         # State management
│   ├── types/         # TypeScript types
│   └── utils/         # Utility functions
├── .env               # Environment variables
└── package.json
```

### Setup Instructions

1. **Create Vite Project**
   ```bash
   npm create vite@latest jaggerpay-frontend -- --template react-ts
   cd jaggerpay-frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   
   # Core dependencies
   npm install @tanstack/react-query axios react-router-dom
   
   # UI dependencies (if using shadcn/ui)
   npm install @radix-ui/react-* class-variance-authority clsx tailwindcss
   
   # Type definitions
   npm install -D @types/node
   ```

3. **Configure Tailwind CSS**
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

4. **Environment Setup**
   Create `.env`:
   ```env
   VITE_API_URL=http://localhost:3000/api
   VITE_MONITE_API_URL=https://api.sandbox.monite.com/v1
   ```

5. **Development**
   ```bash
   npm run dev
   ```

### Key Considerations for Frontend

1. **State Management**
   - Use React Query for server state
   - Consider Zustand for client state
   - Implement proper caching strategies

2. **Authentication**
   - Implement JWT or session-based auth
   - Use protected routes
   - Handle token refresh

3. **API Integration**
   - Create service classes for API calls
   - Implement proper error handling
   - Use TypeScript interfaces for API responses

4. **UI Components**
   - Use a component library (shadcn/ui recommended)
   - Implement responsive design
   - Follow accessibility guidelines

5. **Performance**
   - Implement code splitting
   - Use lazy loading for routes
   - Optimize bundle size

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is private and proprietary. All rights reserved.

## Support

For support, email [support contact] or join our Slack channel.
