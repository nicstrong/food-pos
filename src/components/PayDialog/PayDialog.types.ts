import { api } from "~/utils/api";

export type OrderCreatorType = ReturnType<typeof api.order.createOrder.useMutation>
