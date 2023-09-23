import { Modal } from "@mantine/core";
import { useAtomValue } from "jotai";
import {
  orderNumberAtom,
} from "~/store/order";
import css from "./PayDialog.module.scss";
import { api } from "~/utils/api";
import { Order } from "~/model";
import { Totals } from "./Totals";
import { Actions } from "./Actions";


type Props = {
  isOpen: boolean;
  onClose: (order?: Order) => void;  
};
export function PayDialog({ isOpen, onClose }: Props) {
  const orderNumber = useAtomValue(orderNumberAtom);
  const orderCreator = api.order.createOrder.useMutation();

  return (
    <Modal
      opened={isOpen}
      centered
      onClose={onClose}
      closeOnEscape
      closeOnClickOutside={false}
      title={`Pay order #${orderNumber}`}
      size="70%"
    >
      <div className={css.payDialog}>
        <Totals orderCreator={orderCreator} onPayed={order => onClose(order)} />
        <Actions orderCreator={orderCreator} />
      </div>
    </Modal>
  );
}

