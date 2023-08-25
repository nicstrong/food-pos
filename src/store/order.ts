import { atom } from "jotai";
import { type MenuItem } from "~/model";

export type OrderItem = { item: MenuItem; quantity: number };
export const orderAtom = atom<OrderItem[]>([]);
orderAtom.debugLabel = "order";

export const orderTotalAtom = atom((get) => {
  return get(orderAtom).reduce(
    (acc, { item, quantity }) => acc + parseFloat(item.price) * quantity,
    0
  );
});
orderTotalAtom.debugLabel = "orderTotal";

export const orderEditAtom = atom(false)
orderEditAtom.debugLabel = "orderEdit"
