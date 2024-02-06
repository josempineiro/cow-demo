import { EnrichedOrder } from "@cowprotocol/cow-sdk";
import "./order-card.css";

export function parseAmount(amount: string) {
  return +amount / Math.pow(10, 18);
}

export function Amount({ amount }: { amount: string }) {
  return <span>{parseAmount(amount)}</span>;
}

export function Datetime({ datetime }: { datetime: string }) {
  return <span>{new Date(datetime).toLocaleString()}</span>;
}

export function UUID({
  uuid,
  substring = Infinity,
}: {
  uuid: string;
  substring?: number;
}) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(uuid);
  };
  return (
    <span title="Click copy to clipboard" onClick={copyToClipboard}>
      {uuid.substring(0, substring)}
    </span>
  );
}

export function OrderCard({ order }: { order: EnrichedOrder }) {
  return (
    <>
      <table className="order-card">
        <tbody>
          <tr>
            <td>
              <span>UUID:</span>
            </td>
            <td>
              <UUID uuid={order.uid} />
            </td>
          </tr>

          <tr>
            <td>From</td>
            <td>
              <UUID uuid={order.owner} />
            </td>
          </tr>

          <tr>
            <td>Status</td>
            <td>{order.status}</td>
          </tr>
          {order.receiver && (
            <tr>
              <td>To</td>
              <td>
                <UUID uuid={order.receiver} />
              </td>
            </tr>
          )}
          <tr>
            <td>
              <span>Executed sell amount</span>
            </td>
            <td>
              <Amount amount={order.executedSellAmount} />
            </td>
          </tr>
          <tr>
            <td>
              <span>Executed buy amount</span>
            </td>
            <td>
              <Amount amount={order.executedBuyAmount} />
            </td>
          </tr>
          <tr>
            <td>
              <span>Buy amount</span>
            </td>
            <td>
              <Amount amount={order.buyAmount} />
            </td>
          </tr>
          <tr>
            <td>
              <span>Fee amount</span>
            </td>
            <td>
              <Amount amount={order.feeAmount} />
            </td>
          </tr>
          <tr>
            <td>
              <span>Surplus</span>
            </td>
            <td>
              {parseAmount(order.executedBuyAmount) -
                parseAmount(order.buyAmount) -
                parseAmount(order.feeAmount)}
            </td>
          </tr>
          <tr>
            <td>
              <span>Creation date</span>
            </td>
            <td>
              <Datetime datetime={order.creationDate} />
            </td>
          </tr>
          <tr>
            <td>
              <span>Valid date</span>
            </td>
            <td>
              <Datetime
                datetime={new Date(order.validTo * 1000).toISOString()}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
