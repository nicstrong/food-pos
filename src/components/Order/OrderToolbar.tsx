import { ActionIcon } from "@mantine/core";
import { useAtom } from "jotai";
import { useState } from "react";
import { MdAdd, MdEdit, MdOutlineDelete } from "react-icons/md";
import { orderAtom, orderEditAtom } from "~/store/order";
import { AlertDialog } from "../AlertDialog";
import css from "./OrderToolbar.module.scss";

export function OrderToolbar() {
  const [order, setOrder] = useAtom(orderAtom);
  const [editMode, setEditMode] = useAtom(orderEditAtom);

  const [showClear, setShowClear] = useState(false);

  const handleClear = (ok: boolean) => {
    if (ok) {
      setOrder([]);
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
          className={editMode  &&  css.editMode}
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
