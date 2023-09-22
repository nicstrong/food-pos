import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const orderRouter = createTRPCRouter({
    createOrder: protectedProcedure
        .input(z.object({
            name: z.string(),
            email: z.string().optional(),
            status: z.enum(['CREATED', 'PAID', 'STARTED', 'COMPLETED', 'CANCELLED']),
            paymentMethodId: z.string(),
            surcharge: z.number(),
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
        })
})

