import { Hono } from 'hono'
import { cors } from 'hono/cors'

import { getWordList } from "./load";

const app = new Hono();

app.use("/api/v1/*", cors())

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
