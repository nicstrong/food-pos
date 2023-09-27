import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { Order } from "~/model";

export function useOrder(order: Order, refresh?: number) {
    const [refreshCounter, setRefreshCounter] = useState(0)
    const duration = useMemo(() =>
        dayjs.duration(dayjs().diff(dayjs(order.createdAt))), [order.createdAt, refreshCounter])
    const total = useMemo(() => order.orderItems.reduce((acc, item) => acc + item.price, 0), []);

    useEffect(() => {
        if (!refresh) return
        let timer: number
        setTimer()
        return () => { window.clearInterval(timer) }
        function setTimer() {
            timer = window.setInterval(() => {
                setRefreshCounter(c => c + 1)
            }, refresh)
        }
    }, [refresh])

    return { duration, total }
}