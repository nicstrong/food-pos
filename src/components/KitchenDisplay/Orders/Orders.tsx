import { Order } from "~/model"
import css from './Orders.module.scss'
import { Divider, Paper, Pill } from "@mantine/core"
import classNames from "classnames"
import dayjs from "dayjs"
import { useOrder } from "~/utils/order"
import { OrderStatus } from "@prisma/client"
type Props = {
    orders: Order[]
}

export function Orders({ orders }: Props) {

    return <div className={css.orders}>
        {orders.map((order, seq) => <Order key={order.id} seq={seq + 1} order={order} />)}
    </div>

}

function Order({ order, seq }: { order: Order, seq: number }) {
    const { total, duration } = useOrder(order, 1000)
    return <Paper className={css.order} shadow="sm">
        <div className={css.row}>
            <Pill className={css.orderNumber}>#{seq}</Pill>
            <span>{getOrderStatus(order.status)}</span>
            <Divider orientation="vertical" />
            <span></span>
        </div>
        <div className={css.row}>
            <span>${total.toFixed(2)}</span>
            <span className={classNames(duration.asMinutes() > 5 && css.overdue)}>{dayjs(order.createdAt).fromNow()}</span>
        </div>
    </Paper>
}

function getOrderStatus(status: OrderStatus): string {
    switch (status) {
        case OrderStatus.CREATED:
        case OrderStatus.PAID:
            return "New"
        case OrderStatus.PREPARING:
            return "Preparing"
        case OrderStatus.COMPLETED:
            return "Done"
        case OrderStatus.COLLECTED:
            return "Collected"
        case OrderStatus.CANCELLED:
            return "Cancelled"
    }
}