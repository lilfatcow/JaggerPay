# WonderPay

WonderPay is a private bill pay and payments automation platform built for Wonderland Studio to streamline AP & AR operations.

## Features

- **Dashboard**: Overview of financial operations
- **Bill Pay**: Manage accounts payable and invoices
- **Receivables**: Track and manage accounts receivable
- **WonderPay Capital**: Access working capital solutions
- **Clients & Vendors**: Manage counterparts
- **Team Management**: Control access and permissions
- **Organization Settings**: Configure entity details

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your Monite credentials:
   ```
   NEXT_PUBLIC_MONITE_API_URL=https://api.sandbox.monite.com/v1
   NEXT_PUBLIC_MONITE_CLIENT_ID=your_client_id
   NEXT_PUBLIC_MONITE_CLIENT_SECRET=your_client_secret
   NEXT_PUBLIC_MONITE_ENTITY_ID=your_entity_id
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Testing Instructions

1. Visit the application URL
2. Click "Log In" on the landing page
3. Use the following test credentials:
   - Email: test@wonderland.studio
   - Password: provided separately

### Test Features

1. **Dashboard**
   - View financial overview
   - Check recent transactions
   - Use date range picker

2. **Bill Pay**
   - Create new payables
   - Upload invoices
   - Process payments

3. **Receivables**
   - Generate invoices
   - Track payments
   - Send reminders

4. **Clients & Vendors**
   - Add new counterparts
   - Manage relationships
   - Update information

## Technology Stack

- Next.js 13 (App Router)
- TypeScript
- Tailwind CSS
- Monite SDK
- Radix UI
- Lucide Icons

## Support

For support, please contact support@wonderland.studio