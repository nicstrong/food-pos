import { useSetAtom } from "jotai";
import { orderEmailAtom, orderItemsAtom, orderNameAtom, orderPayByAtom } from "./order";
import { useCallback } from "react";

export function useResetOrder() {
    const setOrderItems = useSetAtom(orderItemsAtom);
    const setOrderName = useSetAtom(orderNameAtom);
    const setOrderEmail = useSetAtom(orderEmailAtom);
    const setOrderPayBy = useSetAtom(orderPayByAtom);

    const reset = useCallback(() => {
        setOrderItems([]);
        setOrderName('');
        setOrderEmail(null);
        setOrderPayBy(null)
    }, [setOrderItems, setOrderName]);

    return reset;
}  
