import { Order } from "~/model"
import css from './Orders.module.scss'
import { Divider, Paper, Pill } from "@mantine/core"
import classNames from "classnames"
import dayjs from "dayjs"
import { useOrder } from "~/utils/order"
import { OrderStatus } from "@prisma/client"
import { BsClockFill } from 'react-icons/bs'
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
    return <Paper className={css.order} shadow="sm" radius='sm'>
        <div className={classNames(css.top,
            (order.status === 'CREATED' || order.status === 'PAID') && css.new,
            order.status === 'PREPARING' && css.preparing,
            order.status === 'COMPLETED' && css.done)} >
            <div className={css.row}>
                <Pill className={css.orderNumber}>#{seq}</Pill>
                <div className={css.group}>
                    <span className={css.heading}>{getOrderStatus(order.status)}</span>
                    <Divider size='md' color='dark' className={css.divider} />
                    <span>{duration.format('mm[m]ss[s]')}</span>
                </div>
            </div>
            <div className={classNames(css.row, css.detail)}>
                <span>#{order.orderNumber}</span>
                <span>{order.name}</span>
                <div className={css.group}>
                    <BsClockFill />
                    <span>{dayjs(order.createdAt).format('hh:mm A')}</span>
                </div>

            </div>
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