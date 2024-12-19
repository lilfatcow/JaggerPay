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

## API Documentation

### Authentication

JaggerPay uses NextAuth.js for authentication with JWT strategy. The authentication flow supports both server-side and client-side implementations.

#### Server-Side (Next.js)

Authentication is handled through NextAuth.js with the following endpoints:

```typescript
POST /api/auth/signin
POST /api/auth/signout
GET  /api/auth/session
POST /api/auth/callback/credentials
```

##### Credentials Provider Setup

```typescript
// Environment Variables Required
NEXTAUTH_SECRET="your-jwt-secret"
NEXTAUTH_URL="http://localhost:3000"

// Example Authentication Request
POST /api/auth/callback/credentials
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your-password"
}
```

##### Protected API Routes

```typescript
// Example of a protected API route
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  
  // Your protected route logic here
}
```

#### Client-Side (React + Vite)

For the React + Vite frontend, implement authentication using the following approach:

1. **Setup Authentication Context**

```typescript
// src/contexts/AuthContext.tsx
import { createContext, useContext, useState } from 'react';

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      throw new Error('Authentication failed');
    }
    
    const data = await response.json();
    setToken(data.token);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

2. **Protected Route Component**

```typescript
// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}
```

### API Endpoints

JaggerPay uses tRPC for type-safe API communication. Here are the available endpoints:

#### Invoices

1. **Get All Invoices**
```typescript
// Query
const invoices = await trpc.invoice.getAll.query({
  limit?: number;  // Optional, max 100
  offset?: number; // Optional
});

// Response Type
interface Invoice {
  id: string;
  moniteId: string;
  amount: number;
  status: string;
  dueDate: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

2. **Create Invoice**
```typescript
// Mutation
const invoice = await trpc.invoice.create.mutate({
  amount: number;
  dueDate: string; // ISO date string
  // Additional fields as needed
});

// Response includes both local and Monite invoice data
```

### Monite API Integration

JaggerPay integrates with the Monite API for payment processing. Here's how to set it up:

1. **Environment Configuration**
```env
NEXT_PUBLIC_MONITE_API_URL=https://api.sandbox.monite.com/v1
NEXT_PUBLIC_MONITE_VERSION=2024-01-31
MONITE_API_KEY=your_api_key
```

2. **Service Setup**
```typescript
// src/services/monite.ts
export class MoniteService {
  private readonly apiUrl: string;
  private readonly version: string;
  
  constructor() {
    this.apiUrl = process.env.NEXT_PUBLIC_MONITE_API_URL!;
    this.version = process.env.NEXT_PUBLIC_MONITE_VERSION!;
  }

  async createInvoice(data: CreateInvoiceDto) {
    // Implementation
  }
  
  // Other methods
}
```

### Error Handling

The API uses standard HTTP status codes and returns errors in the following format:

```typescript
interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// Example error response
{
  "code": "UNAUTHORIZED",
  "message": "Invalid credentials",
  "details": {
    "field": "password",
    "error": "incorrect_password"
  }
}
```

Common error codes:
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `422`: Validation Error
- `500`: Internal Server Error

### Rate Limiting

API requests are rate-limited to:
- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

### Security Considerations

1. **CORS Configuration**
```typescript
// Next.js API route CORS configuration
export const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || [],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
```

2. **JWT Configuration**
```typescript
// src/app/api/auth/[...nextauth]/route.ts
export const authOptions: NextAuthOptions = {
  // ... other options
  jwt: {
    maxAge: 60 * 60 * 24, // 24 hours
    secret: process.env.NEXTAUTH_SECRET,
  },
  // ... additional configuration
};
```

### WebSocket Support

For real-time features, JaggerPay uses WebSocket connections:

```typescript
// Client-side WebSocket setup
const ws = new WebSocket('ws://your-api-url/ws');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // Handle real-time updates
};
```

### Testing the API

1. **Using curl**
```bash
# Authentication
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# Create Invoice (with authentication)
curl -X POST http://localhost:3000/api/trpc/invoice.create \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"amount":100,"dueDate":"2024-12-31"}'
```

2. **Using Postman**
Import the Postman collection from `/docs/postman/jaggerpay-api.json`

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
