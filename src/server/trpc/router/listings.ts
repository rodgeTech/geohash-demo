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
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.object({
          name: z.string(),
          address: z.string(),
          latitude: z.string().transform((val) => Number(val)),
          longitude: z.string().transform((val) => Number(val)),
          details: z.string().nullish(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const geohash = ngeohash.encode(
        input.data.latitude,
        input.data.longitude,
        5
      );

      const listing = await ctx.prisma.listing.update({
        data: { ...input.data, geohash },
        where: {
          id: input.id,
        },
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
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.listing.findFirst({
        where: {
          id: input.id,
        },
      });
    }),
});
