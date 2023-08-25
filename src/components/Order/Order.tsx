import { Button } from "@chakra-ui/react";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { orderAtom, orderEditAtom, orderTotalAtom } from "~/store/order";
import css from "./Order.module.scss";
import { OrderLineItem } from "./OrderLineItem";
import { OrderToolbar } from "./OrderToolbar";

export function Order() {
  const order = useAtomValue(orderAtom);
  const orderTotal = useAtomValue(orderTotalAtom);
  const setEditMode = useSetAtom(orderEditAtom);

  useEffect(() => {
    if (order.length === 0) {
      setEditMode(false);
    }
  });

  return (
    <div className={css.order}>
      <OrderToolbar />
      <ul className={css.items}>
        {order.map((item, idx) => (
          <OrderLineItem key={item.item.id} item={item} index={idx} />
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
