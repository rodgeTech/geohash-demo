import { z } from "zod";
import ngeohash from "ngeohash";

import { router, publicProcedure } from "../trpc";
import type { Listing } from "@prisma/client";

export const searchRouter = router({
  nearBy: publicProcedure
    .input(z.object({ latitude: z.number(), longitude: z.number() }))
    .query(async ({ ctx, input }) => {
      const currentGeohash = ngeohash.encode(
        input.latitude,
        input.longitude,
        5
      );

      console.log("currentGeohash", currentGeohash);

      // const precision = 5 * 1609.34; // 5 miles

      const results: Listing[] = await ctx.prisma.$queryRaw`
        SELECT *
        FROM "Listing"
        WHERE geohash = ${currentGeohash};
      `;

      return results;
    }),
});
