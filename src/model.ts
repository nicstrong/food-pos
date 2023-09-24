import { type RouterOutputs } from "./utils/api";

export type MenuItem = RouterOutputs["menu"]["getMenuItems"][number];
export type PayMethood = RouterOutputs["pay"]["getPayMethods"][number];
export type CreateOrder = RouterOutputs["order"]["createOrder"];
export type Order = RouterOutputs["order"]["getOrders"][number];
