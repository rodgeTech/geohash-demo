import { z } from "zod";
import ngeohash from "ngeohash";

import { router, publicProcedure } from "../trpc";

export const listingsRouter = router({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        address: z.string(),
        latitude: z.string().transform((val) => Number(val)),
        longitude: z.string().transform((val) => Number(val)),
        details: z.string().nullish(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const geohash = ngeohash.encode(input.latitude, input.longitude, 5);

      const listing = await ctx.prisma.listing.create({
        data: { ...input, geohash },
      });

      return listing;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
});
