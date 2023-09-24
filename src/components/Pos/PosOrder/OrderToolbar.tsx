import { ActionIcon } from "@mantine/core";
import { useAtom } from "jotai";
import { useState } from "react";
import { MdAdd, MdEdit, MdOutlineDelete } from "react-icons/md";
import { orderItemsAtom, orderEditAtom } from "~/store/order";
import css from "./OrderToolbar.module.scss";
import { useResetOrder } from "~/store/hooks";
import classNames from "classnames";
import { AlertDialog } from "../../shared/AlertDialog";

export function OrderToolbar() {
  const [order, setOrder] = useAtom(orderItemsAtom);
  const [editMode, setEditMode] = useAtom(orderEditAtom);
  const resetOrder = useResetOrder();

  const [showClear, setShowClear] = useState(false);

  const handleClear = (ok: boolean) => {
    if (ok) {
      resetOrder()
      setEditMode(false);
    }
    setShowClear(false);
  };

  return (
    <>
      <ul className={css.orderToolbar}>
        <ActionIcon
          variant="default"
          aria-label="Clear order"
          title="Clear order"
          onClick={() => setShowClear(true)}
          disabled={order.length === 0}
        >
          <MdOutlineDelete />
        </ActionIcon>
        <ActionIcon
          variant="default"
          aria-label="Add custom item"
          title="Add custom item"
        >
          <MdAdd />
        </ActionIcon>
        <ActionIcon
          variant="default"
          aria-label="Edit order"
          title="Edit order"
          disabled={order.length === 0}
          onClick={() => setEditMode(!editMode)}
          className={classNames(editMode && css.editMode)}
        >
          <MdEdit />
        </ActionIcon>
      </ul>
      <AlertDialog      
        isOpen={showClear}
        onClose={handleClear}
        heading="Clear order"
        message="Are you sure you want to clear the order?"
        okText="Clear"
      />
    </>
  );
}
