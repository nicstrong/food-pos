import { Button } from "@mantine/core";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { orderItemsAtom, orderEditAtom, orderPayByAtom, orderTotalAtom } from "~/store/order";
import css from "./Order.module.scss";
import { OrderLineItem } from "./OrderLineItem";
import { OrderToolbar } from "./OrderToolbar";
import PayDialog from "../PayDialog";
import type { Order } from "~/model";
import { useResetOrder } from "~/store/hooks";

export function Order() {
  const order = useAtomValue(orderItemsAtom);
  const orderTotal = useAtomValue(orderTotalAtom);
  const setEditMode = useSetAtom(orderEditAtom);
  const [showPayDialog, setShowPayDialog] = useState(false);
  const resetOrder = useResetOrder()

  useEffect(() => {
    if (order.length === 0) {
      setEditMode(false);
    }
  });

  function onOrder(order?: Order) {
    setShowPayDialog(false);
    if (order) {
      resetOrder();
    }
  }

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
      <Button
        color="green"
        onClick={() => setShowPayDialog(true)}
        disabled={order.length === 0}
      >
        Pay
      </Button>

      <PayDialog
        isOpen={showPayDialog}
        onClose={onOrder}
      />
    </div>
  );
}
