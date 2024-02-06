import { EnrichedOrder } from "@cowprotocol/cow-sdk";
import { OrderCard } from "~/components/order-card";
import "./orders-list.css";

export function OrdersList({ orders }: { orders: EnrichedOrder[] }) {
  return (
    <ul className="orders-list">
      {orders.map((order) => (
        <li className="orders-list-item" key={order.creationDate}>
          <OrderCard order={order} />
        </li>
      ))}
    </ul>
  );
}
