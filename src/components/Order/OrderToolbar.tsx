import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useState } from "react";
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
        <IconButton
          aria-label="Clear order"
          title="Clear order"
          onClick={() => setShowClear(true)}
          isDisabled={order.length === 0}
          icon={<DeleteIcon />}
        />
        <IconButton
          aria-label="Add custom item"
          title="Add custom item"
          icon={<AddIcon />}
        />
        <IconButton
          aria-label="Edit order"
          title="Edit order"
          isDisabled={order.length === 0}
          onClick={() => setEditMode(!editMode)}
          icon={<EditIcon />}
          isActive={editMode}
        />
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
