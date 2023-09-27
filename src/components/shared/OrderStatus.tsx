import { Pill } from "@mantine/core";
import css from "./OrderStatus.module.scss";
import { Order } from "~/model";
import classNames from "classnames";

export function OrderStatus({ status }: { status: Order['status'] }) {
    return <Pill className={classNames(
        css.status,
        status === 'CREATED' && css.created,
        status === 'PREPARING' && css.preparing,
        status === 'PAID' && css.paid,
        status === 'COMPLETED' && css.completed)} >
        {status}
    </Pill>
}