import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { MoniteService } from '../services/monite';
import { prisma } from '../db';

const moniteService = new MoniteService();

export const invoiceRouter = router({
  getAll: protectedProcedure
    .input(z.object({
      limit: z.number().min(1).max(100).optional(),
      offset: z.number().min(0).optional(),
    }).optional())
    .query(async ({ ctx }) => {
      const invoices = await prisma.invoice.findMany({
        where: {
          userId: ctx.session.user.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return invoices;
    }),

  create: protectedProcedure
    .input(z.object({
      amount: z.number(),
      dueDate: z.string(),
      // Add other invoice fields as needed
    }))
    .mutation(async ({ ctx, input }) => {
      // Create invoice in Monite
      const moniteInvoice = await moniteService.createInvoice({
        amount: input.amount,
        due_date: input.dueDate,
        // Map other fields
      });

      // Store invoice in local database
      const invoice = await prisma.invoice.create({
        data: {
          moniteId: moniteInvoice.id,
          amount: input.amount,
          status: moniteInvoice.status,
          dueDate: new Date(input.dueDate),
          userId: ctx.session.user.id,
        },
      });

      return invoice;
    }),

  getById: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const invoice = await prisma.invoice.findFirst({
        where: {
          id: input,
          userId: ctx.session.user.id,
        },
      });

      if (!invoice) {
        throw new Error('Invoice not found');
      }

      // Get additional details from Monite
      const moniteInvoice = await moniteService.getInvoice(invoice.moniteId);

      return {
        ...invoice,
        moniteDetails: moniteInvoice,
      };
    }),
});
