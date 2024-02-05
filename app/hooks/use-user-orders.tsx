import { useWeb3 } from "~/contexts/web3-provider";
import { useOrders, UseOrderOptions } from "~/hooks/use-orders";

export function useUserOrders({
  offset,
  limit,
}: Omit<UseOrderOptions, "owner">) {
  const { account } = useWeb3();
  return useOrders(
    {
      offset,
      limit,
      owner: account,
    },
    {
      enabled: !!account,
    }
  );
}
