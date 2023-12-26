import { count, generate } from 'random-words';
import { publicProcedure, router } from './trpc';
import { z } from 'zod';

export const appRouter = router({
  getTodos: publicProcedure
    .query(async () => {
      return [10, 20, 30];
    }),
  getWords: publicProcedure
    .input(z.object({ language: z.string(), limit: z.number().optional() }))
    .query(async (opt) => {
      const { language, limit = 300 } = opt.input;
      return generate({ minLength: 1, exactly: limit });
    })
});

export type AppRouter = typeof appRouter;