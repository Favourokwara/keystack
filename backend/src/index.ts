import { Hono } from 'hono'

import { getWordList } from "./load";

const app = new Hono();

app
  .basePath("/api/v1")
  .get(
    "/words",
    ctx => {
      const { lang, limit, min, max } = ctx.req.query();

      return ctx.json(getWordList(
        {
          language: lang,
          exactly: limit ? Number(limit) : undefined,
          minLength: min ? Number(min) : undefined,
          maxLength: max ? Number(max) : undefined,
        }
      ));
    }
  );

export default app;

// localhost:3000/api/v1/words?lang=english&limit=5&min=3&max=7