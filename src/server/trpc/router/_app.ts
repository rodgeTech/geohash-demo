import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { searchRouter } from "./search";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  search: searchRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
