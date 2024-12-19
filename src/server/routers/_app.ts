import { router } from '../trpc';
import { invoiceRouter } from './invoice';

export const appRouter = router({
  invoice: invoiceRouter,
});

export type AppRouter = typeof appRouter;
