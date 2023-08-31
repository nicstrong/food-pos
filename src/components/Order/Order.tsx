import { Button } from "@chakra-ui/react";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { orderAtom, orderEditAtom, orderTotalAtom } from "~/store/order";
import css from "./Order.module.scss";
import { OrderLineItem } from "./OrderLineItem";
import { OrderToolbar } from "./OrderToolbar";
import { PayDialog } from "./PayDialog";

export function Order() {
  const order = useAtomValue(orderAtom);
  const orderTotal = useAtomValue(orderTotalAtom);
  const setEditMode = useSetAtom(orderEditAtom);
  const [showPayDialog, setShowPayDialog] = useState(false);

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
      <Button colorScheme="green" onClick={() => setShowPayDialog(true)} isDisabled={order.length === 0}>
        Pay
      </Button>

      <PayDialog
        isOpen={showPayDialog}
        onClose={() => setShowPayDialog(false)}
      />
    </div>
  );
}
