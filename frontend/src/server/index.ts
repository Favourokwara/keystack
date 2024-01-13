import { generate } from "random-words";
import { z } from "zod";

import { publicProcedure, router } from "./trpc";

export const appRouter = router({
    getWords: publicProcedure.input(z.object(
        {
            language: z.string().default("english"),
            limit: z.number().lt(250).default(120)
        }
    )).query(({ input }) => {
        return generate({ exactly: input.limit, min: 26 });
    })
});

export type AppRouter = typeof appRouter;