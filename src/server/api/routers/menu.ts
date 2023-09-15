import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const menuRouter = createTRPCRouter({
  getMenuItems: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.menuItem.findMany();
    return res;
  }),
});
