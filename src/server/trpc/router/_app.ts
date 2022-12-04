import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { searchRouter } from "./search";
import { listingsRouter } from "./listings";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  search: searchRouter,
  listings: listingsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
