import { Loader, Paper } from "@mantine/core";
import { api } from "~/utils/api";
import { Order } from "~/model";
import { useMemo } from "react";
import { Pill } from '@mantine/core';
import css from './OrderList.module.scss';
import classNames from "classnames";
import { OrderStatus } from "~/components/shared/OrderStatus";

export function OrderList() {
    const { data, isLoading } = api.order.getOrders.useQuery(['CREATED', 'STARTED', 'PAID', 'COMPLETED']);


    return <div className={css.orderList}>
        {isLoading && <Loader />}
        {!isLoading && data?.map(order => <Order key={order.id} order={order} />)}
    </div>
}

function Order({ order }: { order: Order }) {
    const total = useMemo(() => order.orderItems.reduce((acc, item) => acc + item.price, 0), []);
    return <Paper className={css.order} shadow="sm">
        <div className={css.row}>
            <span>{order.name}</span>
            <OrderStatus status={order.status} />
        </div>
        <div className={css.row}>
            <span>${total.toFixed(2)}</span>
            <span>{order.createdAt} items</span>
        </div>
    </Paper>
}

