import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const menuRouter = createTRPCRouter({
  getAllMenuItems: privateProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.menuItem.findMany();
    return res;
  }),
});
