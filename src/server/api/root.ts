import { menuRouter } from "~/server/api/routers/menu";
import { createTRPCRouter } from "~/server/api/trpc";
import { payRouter } from "./routers/pay";
import { orderRouter } from "./routers/order";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  menu: menuRouter,
  pay: payRouter,
  order: orderRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
