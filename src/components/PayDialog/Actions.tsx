import { TextInput, Button } from "@mantine/core";
import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";
import { useMemo } from "react";
import { BsCashStack, BsCreditCard2Front } from "react-icons/bs";
import { MdPersonOutline } from "react-icons/md";
import { orderTotalAtom, paymentDenominationsAtom, orderPayByAtom, orderNameAtom } from "~/store/order";
import { api } from "~/utils/api";
import { distinctFilter } from "~/utils/array";
import { OrderCreatorType } from "./PayDialog.types";
import css from "./Actions.module.scss";

type Props = {
  orderCreator: OrderCreatorType
}

export function Actions({ orderCreator }: Props) {
  const orderTotal = useAtomValue(orderTotalAtom);
  const paytDenominations = useAtomValue(paymentDenominationsAtom);
  const [orderPayBy, setOrderPayBy] = useAtom(orderPayByAtom);
  const { data: payMethods, isLoading } = api.pay.getPayMethods.useQuery();
  const [orderName, setOrderName] = useAtom(orderNameAtom);

  const amounts = useMemo(
    () => getAmounts(orderTotal, paytDenominations, 5),
    [orderTotal, paytDenominations]
  );

  return (
    <div className={css.actions}>
      <div className={css.heading}>
        <MdPersonOutline />
        <span>Order name</span>
      </div>
      <TextInput className={css.input} placeholder="Order name" value={orderName} onChange={(event) => setOrderName(event.currentTarget.value)} />

      <div className={css.heading}>
        <BsCashStack />
        <span>Cash</span>
      </div>

      <div className={css.buttons}>
        {amounts.map((p, i) => (
          <Button
            key={i}
            onClick={() => setOrderPayBy({ type: "cash", amount: p })}
            className={classNames(
              orderPayBy?.type === "cash" &&
              orderPayBy.amount === p &&
              css.selected
            )}
            variant="outline"
            disabled={orderCreator.isLoading}
          >
            {`$${p.toFixed(2)}`}
          </Button>
        ))}
        <Button variant="outline" disabled={orderCreator.isLoading}>Other</Button>
      </div>

      <div className={css.heading}>
        <BsCreditCard2Front />
        <span>Other</span>
      </div>
      <div className={css.buttons}>

        {payMethods && payMethods.map((payMethod) => <Button
          key={payMethod.id}
          variant="outline"
          onClick={() => setOrderPayBy({ type: 'other', method: payMethod })}
          className={classNames(orderPayBy?.type === 'other' && orderPayBy?.method.id === payMethod.id && css.selected)}
          disabled={orderCreator.isLoading}
        >{payMethod.name}</Button>
        )}
      </div>
    </div>
  );
}

function getAmounts(orderTotal: number, denominations: number[], num: number) {
  const amounts: number[] = [];

  amounts.push(orderTotal);
  amounts.push(Math.ceil(orderTotal));

  for (const denomination of denominations) {
    const val = denomination * Math.ceil(Math.abs(orderTotal / denomination));
    amounts.push(val);
  }
  const uniqueAmounts = amounts.filter(distinctFilter);
  return uniqueAmounts.slice(0, Math.min(num, uniqueAmounts.length));
}
