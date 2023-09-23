import { atom } from "jotai";
import { type PayMethood as PayMethod, type MenuItem } from "~/model";

export type OrderItem = { item: MenuItem; quantity: number };
export const orderItemsAtom = atom<OrderItem[]>([]);
orderItemsAtom.debugLabel = "orderItems";

export const orderNameAtom = atom<string>('');
orderNameAtom.debugLabel = "orderName";

export const orderEmailAtom = atom<string|null>(null);
orderEmailAtom.debugLabel = "orderEmaill";

export const orderTotalAtom = atom((get) => {
  const total = get(orderItemsAtom).reduce(
    (acc, { item, quantity }) => acc + item.price * quantity,
    0
  );
  const payBy = get(orderPayByAtom)
  if (payBy === null || payBy.type === 'cash' || payBy.method.surcharge === 0) {
    return total;
  } 
  return total + (total * (payBy.method.surcharge/100));
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
      type: "other"
      method: PayMethod;
    };

export const orderPayByAtom= atom<PayBy | null>(null);
orderPayByAtom.debugLabel = "orderPayBy";
