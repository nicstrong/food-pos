import {
    Button,
    Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";
import { useMemo } from "react";
import { BsCashStack, BsCreditCard2Front } from "react-icons/bs";
import {
    PayBy,
    orderGstAtom,
    orderNumberAtom,
    orderPayByAtom,
    orderTotalAtom,
    paymentDenominationsAtom,
} from "~/store/order";
import { distinctFilter } from "~/utils/array";
import css from "./PayDialog.module.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
export function PayDialog({ isOpen, onClose }: Props) {
  const orderNumber = useAtomValue(orderNumberAtom);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      size="5xl"
      isCentered
    >
      <ModalOverlay />
      <ModalContent className={css.payDialog}>
        <ModalHeader>{`Pay order #${orderNumber}`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody className={css.payDialog}>
          <PayTotals />
          <PayActions />
        </ModalBody>

        {/* <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
}

export function PayTotals() {
  const gst = useAtomValue(orderGstAtom);
  const orderTotal = useAtomValue(orderTotalAtom);
  const [orderPayBy, setOrderPayBy] = useAtom(orderPayByAtom);
  const tenderedAmount =
    orderPayBy === null
      ? null
      : orderPayBy.type === "cash"
      ? orderPayBy.amount
      : orderTotal;
  const remainingAmount =
    tenderedAmount !== null ? tenderedAmount - orderTotal : null;

  const handlePaid = () => {};

  return (
    <div className={css.payTotals}>
      <span className={css.totalsHeading}>Totals</span>
      <div className={css.item}>
        <span>Order subtotal</span>
        <span>{(orderTotal - orderTotal * gst).toFixed(2)}</span>
      </div>
      <div className={css.item}>
        <span>G.S.T</span>
        <span>{`${(orderTotal * gst).toFixed(2)}`}</span>
      </div>
      <div className={classNames(css.item, css.bold, css.total)}>
        <span>Total</span>
        <span>${`${orderTotal.toFixed(2)}`}</span>
      </div>
      {orderPayBy !== null && tenderedAmount && (
        <div className={classNames(css.item)}>
          <span>{getPayByType(orderPayBy)}</span>
          <span>{tenderedAmount.toFixed(2)}</span>
        </div>
      )}
      {remainingAmount !== null && remainingAmount !== 0 && (
        <div className={classNames(css.item, css.bold)}>
          <span>{remainingAmount > 0 ? "Change" : "Remaining"}</span>
          <span>{remainingAmount.toFixed(2)}</span>
        </div>
      )}

      <Button className={css.paid} colorScheme="green" onClick={() => handlePaid()}>
        Paid
      </Button>
    </div>
  );
}

function getPayByType(orderPayBy: PayBy) {
  switch (orderPayBy.type) {
    case "cash":
      return "Cash";
    case "eftpos":
      return "EFTPOS";
    case "wepay":
      return "Wepay";
  }
}

export function PayActions() {
  const orderTotal = useAtomValue(orderTotalAtom);
  const paytDenominations = useAtomValue(paymentDenominationsAtom);
  const [orderPayBy, setOrderPayBy] = useAtom(orderPayByAtom);

  const amounts = useMemo(
    () => getAmounts(orderTotal, paytDenominations, 5),
    [orderTotal, paytDenominations]
  );

  return (
    <div className={css.payActions}>
      <div className={css.heading}>
        <Icon as={BsCashStack} />
        <span>Cash</span>
      </div>

      <div className={css.buttons}>
        {amounts.map((p, i) => (
          <Button
            key={i}
            onClick={() => setOrderPayBy({ type: "cash", amount: p })}
            isActive={orderPayBy?.type === "cash" && orderPayBy.amount === p}
            variant="outline"
          >
            {`$${p.toFixed(2)}`}
          </Button>
        ))}
        <Button variant="outline">Other</Button>
      </div>

      <div className={css.heading}>
        <Icon as={BsCreditCard2Front} />
        <span>Other</span>
      </div>
      <div className={css.buttons}>
        <Button
          variant="outline"
          onClick={() => setOrderPayBy({ type: "eftpos" })}
          isActive={orderPayBy?.type === "eftpos"}
        >
          EFTPOS
        </Button>
        <Button
          variant="outline"
          onClick={() => setOrderPayBy({ type: "wepay" })}
          isActive={orderPayBy?.type === "wepay"}
        >
          Wepay
        </Button>
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
