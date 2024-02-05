import {
  ApproveSellTokenOrderForm,
  SellTokenOrderFormValue,
} from "~/components/approve-sell-token-order-form";
import { useSearchParams } from "@remix-run/react";
import { useApprove } from "~/hooks/use-approve";

function useSellTokenOrderQueryParams(
  sellTokenOrder: SellTokenOrderFormValue
): [SellTokenOrderFormValue, (value: SellTokenOrderFormValue) => void] {
  const [searchParams, setSearchParams] = useSearchParams();

  return [
    {
      relayerAddress:
        searchParams.get("relayerAddress") || sellTokenOrder.relayerAddress,
      tokenAddress:
        searchParams.get("tokenAddress") || sellTokenOrder.tokenAddress,
      amount: searchParams.get("amount")
        ? parseInt(searchParams.get("amount") as string)
        : sellTokenOrder.amount,
    },
    (value: SellTokenOrderFormValue) => {
      setSearchParams({
        relayerAddress: value.relayerAddress,
        tokenAddress: value.tokenAddress,
        amount: value.amount.toString(),
      });
    },
  ];
}

const DEFAULT_SELL_TOKEN_ORDER_QUERY_PARAMS = {
  relayerAddress: "0xC92E8bdf79f0507f65a392b0ab4667716BFE0110",
  tokenAddress: "0xe91d153e0b41518a2ce8dd3d7944fa863463a97d",
  amount: 100,
};

export default function ApproveSellTokenOrder() {
  const [sellTokenOrder, setSellTokenOrder] = useSellTokenOrderQueryParams(
    DEFAULT_SELL_TOKEN_ORDER_QUERY_PARAMS
  );
  const { mutate, error, isError, reset, isPending } = useApprove({
    onError: (error) => {
      console.error("error", error);
    },
  });

  return (
    <>
      {!isError && (
        <ApproveSellTokenOrderForm
          initialValue={sellTokenOrder}
          disabled={isPending}
          onSubmit={(order) => mutate(order)}
          onChange={setSellTokenOrder}
        />
      )}
      {isError && (
        <div>
          <h5>Something went wrong</h5>
          <p>{error.reason}</p>
          <button onClick={() => reset()}>Retry</button>
        </div>
      )}
    </>
  );
}
