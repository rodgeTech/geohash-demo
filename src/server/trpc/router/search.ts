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

      const results: Listing[] = await ctx.prisma.$queryRaw`
        SELECT *,
          6371 * 2 *
          ASIN(
            SQRT(
              POWER(SIN((latitude - ${input.latitude}) * PI() / 180 / 2), 2) +
              COS(latitude * PI() / 180) * COS(${input.latitude} * PI() / 180) *
              POWER(SIN((longitude - ${input.longitude}) * PI() / 180 / 2), 2)
            )
          ) AS distance
        FROM "Listing"
        WHERE geohash = ${currentGeohash}
        ORDER BY distance;
      `;

      return results;
    }),
});
