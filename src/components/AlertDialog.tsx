import { Button, Modal } from "@mantine/core";
import { useRef } from "react";
import css from "./AlertDialog.module.scss";

type Props = {
  isOpen: boolean;
  onClose: (ok: boolean) => void;
  cancelText?: string;
  okText: string;
  heading: string;
  message: string;
};

export function AlertDialog({
  isOpen,
  onClose,
  heading,
  message,
  okText,
  cancelText,
}: Props) {
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  return (
    <Modal
      opened={isOpen}
      onClose={() => onClose(false)}
      centered
      title={heading}
    >
      <span className={css.title}>{message}</span>
      <div className={css.buttons}>
        <Button ref={cancelRef} onClick={() => onClose(false)} variant="light">
          {cancelText ?? "Cancel"}
        </Button>
        <Button onClick={() => onClose(true)} color="red">
          {okText}
        </Button>
      </div>
    </Modal>
  );
}
