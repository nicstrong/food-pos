import { ActionIcon } from "@mantine/core";
import { useAtomValue, useSetAtom } from "jotai";
import { MdAdd, MdOutlineDelete, MdRemove } from "react-icons/md";
import { orderItemsAtom, orderEditAtom, type OrderItem } from "~/store/order";
import css from "./OrderLineItem.module.scss";

export function OrderLineItem({
  item,
  index,
}: {
  item: OrderItem;
  index: number;
}) {
  const setOrder = useSetAtom(orderItemsAtom);
  const edit = useAtomValue(orderEditAtom);

  const handleRemove = () => {
    setOrder((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInc = () => {
    setOrder((prev) =>
      prev.map((i, idx) =>
        idx === index ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  };

  const handleDec = () => {
    setOrder((prev) =>
      prev.map((i, idx) =>
        idx === index ? { ...i, quantity: i.quantity - 1 } : i
      )
    );
  };

  return (
    <li className={css.lineItem}>
      {edit && (
        <div className={css.itemToolbar}>
          <ActionIcon
            aria-label="Remove item"
            title="Remove item"
            variant="light"
            onClick={() => handleRemove()}
          >
            <MdOutlineDelete />
          </ActionIcon>
          <ActionIcon
            aria-label="Increase quantity"
            title="Increase quantity"
            variant="light"
            onClick={() => handleInc()}
          >
            <MdAdd />
          </ActionIcon>
          <ActionIcon
            aria-label="Decrease quantity"
            title="Decrease quantity"
            variant="light"
            disabled={item.quantity < 2}
            onClick={() => handleDec()}
          >
            <MdRemove />
          </ActionIcon>
        </div>
      )}
      <span className={css.description}>{item.item.description}</span>
      <span className={css.quantity}>{`x${item.quantity}`}</span>
      <span className={css.price}>{`$${item.item.price.toFixed(
        2
      )}`}</span>
      <span className={css.itemTotal}>{`$${(
        item.item.price * item.quantity
      ).toFixed(2)}`}</span>
    </li>
  );
}
