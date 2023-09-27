import { Loader, SegmentedControl } from '@mantine/core'
import css from './KitchenDisplay.module.scss'
import { useMemo, useState } from 'react'
import { api } from '~/utils/api'
import { Orders } from './Orders/Orders'
import { never } from 'zod'
import { OrderStatus } from '@prisma/client'

const ALL_ORDER_FILTER_TYPES = ['Active', 'New', 'Preparing', 'Done', 'Archeived'] as const
type OrderFilterType = (typeof ALL_ORDER_FILTER_TYPES)[number]
export function KitchenDisplay() {
    const [filter, setFilter] = useState<OrderFilterType>('Active')

    const statusQuery = useMemo<OrderStatus[]>(() => {
        switch (filter) {
            case 'Active': return [OrderStatus.CREATED, OrderStatus.PAID, OrderStatus.PREPARING, OrderStatus.COMPLETED]
            case 'New': return [OrderStatus.CREATED, OrderStatus.PAID]
            case 'Preparing': return [OrderStatus.PREPARING]
            case 'Done': return [OrderStatus.COMPLETED]
            case 'Archeived': return [OrderStatus.COLLECTED]
            default: 
            const exhaustiveCheck: never = filter
            throw new Error(`Unhandled color case: ${exhaustiveCheck}`);
        }
    }, [filter])
    const { data: orders, isLoading } = api.order.getOrders.useQuery(statusQuery);

    return <div className={css.content}>
        <div className={css.toolbar}>
            <span>Kitchen</span>

            <SegmentedControl
                value={filter}
                onChange={(v) => setFilter(v as OrderFilterType)}
                data={ALL_ORDER_FILTER_TYPES as unknown as string[]}
            />
        </div>
        {isLoading && <Loader />}
        {orders && !isLoading && <Orders orders={orders} />}
    </div>
} 