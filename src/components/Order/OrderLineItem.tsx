import { AddIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useAtomValue, useSetAtom } from "jotai";
import { orderAtom, orderEditAtom, type OrderItem } from "~/store/order";
import css from "./OrderLineItem.module.scss";

export function OrderLineItem({
  item,
  index,
}: {
  item: OrderItem;
  index: number;
}) {
  const setOrder = useSetAtom(orderAtom);
  const edit = useAtomValue(orderEditAtom);

  const handleRemove = () => {
    setOrder((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <li className={css.lineItem}>
      {edit && (
        <div className={css.editToolbar}>
          <IconButton
            aria-label="Remove item"
            title="Remove item"
            icon={<DeleteIcon />}
            onClick={() => handleRemove()}
          />
          <IconButton
            aria-label="Increase quantity"
            title="Increase quantity"
            icon={<AddIcon />}
          />
          <IconButton
            aria-label="Decrease quantity"
            title="Decrease quantity"
            isDisabled={item.quantity < 2}
            icon={<MinusIcon />}
          />
        </div>
      )}
      <span className={css.description}>{item.item.description}</span>
      <span className={css.quantity}>{`x${item.quantity}`}</span>
      <span className={css.price}>{`$${parseFloat(item.item.price).toFixed(
        2
      )}`}</span>
      <span className={css.itemTotal}>{`$${(
        parseFloat(item.item.price) * item.quantity
      ).toFixed(2)}`}</span>
    </li>
  );
}
