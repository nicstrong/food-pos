import { Loader, Paper } from "@mantine/core";
import { useMemo } from "react";
import { OrderStatus } from "~/components/shared/OrderStatus";
import { Order } from "~/model";
import { api } from "~/utils/api";
import css from './OrderList.module.scss';
import dayjs from "dayjs";
import classNames from "classnames";

export function OrderList() {
    const { data, isLoading } = api.order.getOrders.useQuery(['CREATED', 'STARTED', 'PAID', 'COMPLETED']);


    return <div className={css.orderList}>
        {isLoading && <Loader />}
        {!isLoading && data?.map(order => <Order key={order.id} order={order} />)}
    </div>
}

function Order({ order }: { order: Order }) {
    const orderDuration = dayjs.duration(dayjs().diff(dayjs(order.createdAt)))
    const total = useMemo(() => order.orderItems.reduce((acc, item) => acc + item.price, 0), []);
    return <Paper className={css.order} shadow="sm">
        <div className={css.row}>
            <span>{order.name}</span>
            <OrderStatus status={order.status} />
        </div>
        <div className={css.row}>
            <span>${total.toFixed(2)}</span>
            <span className={classNames(orderDuration.asMinutes() > 5 && css.overdue)}>{dayjs(order.createdAt).fromNow()}</span>
            
        </div>
    </Paper>
}

