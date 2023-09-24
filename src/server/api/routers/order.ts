import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const OrderStatusEnum = z.enum(['CREATED', 'PAID', 'STARTED', 'COMPLETED', 'CANCELLED']);

export const orderRouter = createTRPCRouter({
    createOrder: protectedProcedure
        .input(z.object({
            name: z.string(),
            email: z.string().nullish(),
            status: OrderStatusEnum,
            paymentMethodId: z.string().nullish(),
            amountTendered: z.number().nullish(),
            surcharge: z.number().nullish(),
            items: z.array(z.object({
                menuItemId: z.string(),
                quantity: z.number(),
                price: z.number()
            }))

        }))
        .mutation(async ({ ctx, input }) => {
            const res = await ctx.prisma.order.create({
                data: {
                    name: input.name,
                    email: input.email,
                    createdBy: ctx.auth.userId,
                    status: input.status,
                    paymentMethodId: input.paymentMethodId,
                    amountTendered: input.amountTendered,
                    surcharge: input.surcharge,
                    orderItems: {
                        createMany: {
                            data: input.items.map(item => ({
                                menuItemId: item.menuItemId,
                                quantity: item.quantity,
                                price: item.price
                            }))
                        }
                    }
                }
            });
            return res;
        }),
    getOrders: protectedProcedure
        .input(z.array(OrderStatusEnum))
        .query(async ({ ctx, input }) => {
            const res = await ctx.prisma.order.findMany({
                where: {
                    status: {
                        in: input,
                    },
                },
                include: {
                    orderItems: true,
                }
            });
            return res;
        }),
})

