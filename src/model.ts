import { type RouterOutputs } from "./utils/api";

export type MenuItem = RouterOutputs["menu"]["getMenuItems"][number];
export type PayMethood = RouterOutputs["pay"]["getPayMethods"][number];
