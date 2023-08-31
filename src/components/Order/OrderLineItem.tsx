import { AddIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons";
import { ButtonGroup, IconButton } from "@chakra-ui/react";
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
        <ButtonGroup className={css.itemToolbar} isAttached >
          <IconButton
            aria-label="Remove item"
            title="Remove item"
            variant='outline'
            icon={<DeleteIcon />}
            onClick={() => handleRemove()}
          />
          <IconButton
            aria-label="Increase quantity"
            title="Increase quantity"
            variant='outline'
            icon={<AddIcon />}
            onClick={() => handleInc()}
          />
          <IconButton
            aria-label="Decrease quantity"
            title="Decrease quantity"
            variant='outline'
            isDisabled={item.quantity < 2}
            icon={<MinusIcon />}
            onClick={() => handleDec()}
          />
        </ButtonGroup>
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
