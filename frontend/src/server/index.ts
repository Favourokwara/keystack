import { publicProcedure, router } from './trpc';
import { getWordsList } from "most-common-words-by-language";
import { z } from "zod";

export const appRouter = router({
    sayHello: publicProcedure
    .meta({ /* 👉 */ openapi: { method: 'GET', path: '/say-hello' } })
    .input(z.object({ name: z.string() }))
    .output(z.object({ greeting: z.string() }))
    .query(({ input }) => {
      return { greeting: `Hello ${input.name}!` };
    }),
    // words: publicProcedure
    //     .input(z.string())
    //     .query(async (opts) => {
    //         const { input } = opts;
    //         return getWordsList("english", 200);
    //     })
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;