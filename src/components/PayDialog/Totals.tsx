import { Button } from "@mantine/core";
import { Order } from "@prisma/client";
import classNames from "classnames";
import { useAtomValue } from "jotai";
import { orderGstAtom, orderTotalAtom, orderPayByAtom, orderNameAtom, orderEmailAtom, orderItemsAtom } from "~/store/order";
import { OrderCreatorType } from "./PayDialog.types";
import css from "./Totals.module.scss";


type Props = {
  orderCreator: OrderCreatorType
  onPayed: (order: Order) => void
}


export function Totals({ orderCreator, onPayed }: Props) {
  const gst = useAtomValue(orderGstAtom);
  const orderTotal = useAtomValue(orderTotalAtom);
  const orderPayBy = useAtomValue(orderPayByAtom);
  const orderName = useAtomValue(orderNameAtom);
  const orderEmail = useAtomValue(orderEmailAtom);
  const orderItems = useAtomValue(orderItemsAtom);
  const tenderedAmount =
    orderPayBy === null
      ? null
      : orderPayBy.type === "cash"
        ? orderPayBy.amount
        : orderTotal;
  const remainingAmount =
    tenderedAmount !== null ? tenderedAmount - orderTotal : null;

  const handlePaid = async () => {
    if (orderPayBy === null) return;
    await orderCreator.mutate({
      name: orderName,
      email: orderEmail,
      status: 'PAID',
      paymentMethodId: orderPayBy.type === 'other' ? orderPayBy.method.id : null,
      amountTendered: orderPayBy.type === 'cash' ? orderPayBy.amount : null,
      surcharge: orderPayBy.type === 'other' ? orderPayBy?.method.surcharge : null,
      items: orderItems.map(item => ({
        menuItemId: item.item.id,
        quantity: item.quantity,
        price: item.item.price,
      }))
    }, {
      onSuccess: (data) => {
        onPayed(data)
      }
    })
  };

  return (
    <div className={css.totals}>
      <span className={css.heading}>Totals</span>
      <div className={css.item}>
        <span>Order subtotal</span>
        <span>{(orderTotal - orderTotal * gst).toFixed(2)}</span>
      </div>
      <div className={css.item}>
        <span>G.S.T</span>
        <span>{`${(orderTotal * gst).toFixed(2)}`}</span>
      </div>
      {orderPayBy?.type === 'other' && orderPayBy.method.surcharge > 0 && <div className={css.item}>
        <span>Surcharge</span>
        <span>{`${(orderTotal * (orderPayBy.method.surcharge / 100)).toFixed(2)}`}</span>
      </div>}
      <div className={classNames(css.item, css.bold, css.total)}>
        <span>Total</span>
        <span>${`${orderTotal.toFixed(2)}`}</span>
      </div>
      {orderPayBy !== null && tenderedAmount && (
        <div className={classNames(css.item)}>
          <span>{orderPayBy?.type === 'other' ? orderPayBy.method.name : 'Cash'}</span>
          <span>{tenderedAmount.toFixed(2)}</span>
        </div>
      )}
      {remainingAmount !== null && remainingAmount !== 0 && (
        <div className={classNames(css.item, css.bold)}>
          <span>{remainingAmount > 0 ? "Change" : "Remaining"}</span>
          <span>{remainingAmount.toFixed(2)}</span>
        </div>
      )}

      <Button className={css.paid} color="green" onClick={() => handlePaid()} disabled={orderPayBy === null}>
        Paid
      </Button>
    </div>
  );
}
