import { PosItems } from "./PosItems/PosItems";
import { PosOrder } from "./PosOrder";
import css from "./Pos.module.scss";
import { OrderList } from "./OrderList/OrderList";

export function Pos() {
    return (
        <div className={css.content}>
            <nav className={css.nav}>
                <OrderList />
            </nav>
            <div className={css.items}>
                <PosItems />
            </div>
            <div className={css.order}>
                <PosOrder />
            </div>
        </div>
    )
}