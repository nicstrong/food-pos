import { Button } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import { orderAtom, orderTotalAtom, type OrderItem } from "~/store/order";
import css from "./Order.module.scss";

export function Order() {
  const order = useAtomValue(orderAtom);
  const orderTotal = useAtomValue(orderTotalAtom);

  return (
    <div className={css.order}>
      <ul className={css.items}>
        {order.map((item) => (
          <OrderLineItem key={item.item.id} item={item} />
        ))}
      </ul>      
      <div className={css.total}>
        <span>Total</span>
        <span>{`$${orderTotal.toFixed(2)}`}</span>
      </div>
      <Button colorScheme="green">Pay</Button>
    </div>
  );
}

function OrderLineItem({ item }: { item: OrderItem }) {
  return (
    <li className={css.lineItem}>
      <span>{`${item.item.description}${
        item.quantity > 1 ? `(x${item.quantity})` : ""
      }`}</span>
      <span>{`$${parseFloat(item.item.price).toFixed(2)}`}</span>
      <span>{`$${(parseFloat(item.item.price) * item.quantity).toFixed(
        2
      )}`}</span>
    </li>
  );
}
