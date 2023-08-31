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

export const orderEditAtom = atom(false);
orderEditAtom.debugLabel = "orderEdit";

export const orderNumberAtom = atom(1);
orderNumberAtom.debugLabel = "orderNumber";

export const orderGstAtom = atom(0.15);
orderGstAtom.debugLabel = "orderGst";

export const paymentDenominationsAtom = atom([5, 10, 20, 50, 100]);
paymentDenominationsAtom.debugLabel;

export type PayBy =
  | {
      type: "cash";
      amount: number;
    }
  | {
      type: "eftpos" | "wepay";
    };
export const orderPayByAtom= atom<PayBy | null>(null);
orderPayByAtom.debugLabel = "orderPayBy";
