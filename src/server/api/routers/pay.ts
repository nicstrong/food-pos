import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const payRouter = createTRPCRouter({
    getPayMethods: protectedProcedure.query(async ({ ctx }) => {
        const res = await ctx.prisma.payMethod.findMany({
            orderBy: [
                {
                    order: 'asc',
                }
            ]
        });
        return res;
    }),
});
