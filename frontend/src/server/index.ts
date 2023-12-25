import { getWordsList } from 'most-common-words-by-language';
import { publicProcedure, router } from './trpc';
import { z } from 'zod';

export const appRouter = router({
  getTodos: publicProcedure
  .query(async () => {
    return [10, 20, 30];
  }),
  getWords: publicProcedure
  .input(z.object({ language: z.string(), limit: z.number().optional()}))  
  .query(async (opt) => {
      const { language, limit = 300 } = opt.input;
      return getWordsList( language, limit );
    }) 
});

export type AppRouter = typeof appRouter;