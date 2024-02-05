import { useState } from "react";
import { ApproveOptions } from "~/hooks/use-approve";

export type SellTokenOrderFormValue = ApproveOptions;

export function ApproveSellTokenOrderForm({
  onSubmit,
  initialValue,
  disabled,
  onChange = () => {},
}: {
  onSubmit: (
    value: ApproveOptions,
    event: React.FormEvent<HTMLFormElement>
  ) => void;
  onChange?: (value: SellTokenOrderFormValue) => void;
  initialValue: Partial<ApproveOptions>;
  disabled: boolean;
}) {
  const [order, setOrder] = useState<ApproveOptions>({
    relayerAddress: "",
    tokenAddress: "",
    amount: 0,
    ...initialValue,
  });

  function handleFieldChange(event: React.ChangeEvent<HTMLInputElement>) {
    const updatedOrder = {
      ...order,
      [event.target.name]:
        event.target.type === "number"
          ? +event.target.value
          : event.target.value,
    };
    setOrder(updatedOrder);
    onChange(updatedOrder);
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(order, event);
      }}
    >
      <div>
        <label htmlFor="relayerAddress">Relayer Address</label>
        <input
          id="relayerAddress"
          name="relayerAddress"
          type="string"
          disabled={disabled}
          value={order["relayerAddress"]}
          onChange={handleFieldChange}
        />
      </div>
      <div>
        <label htmlFor="tokenAddress">Token Address</label>
        <input
          id="tokenAddress"
          type="string"
          name="tokenAddress"
          disabled={disabled}
          value={order["tokenAddress"]}
          onChange={handleFieldChange}
        />
      </div>
      <div>
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          name="amount"
          type="number"
          disabled={disabled}
          value={order["amount"]}
          onChange={handleFieldChange}
        />
      </div>
      <div>
        <button disabled={disabled} type="submit">
          Approve {order.amount}
        </button>
      </div>
    </form>
  );
}
