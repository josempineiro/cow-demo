import { useWeb3 } from "~/contexts/web3-provider";
import { useTotalSurplus } from "~/hooks/use-total-surplus";

export function useUserTotalSurplus() {
  const { account } = useWeb3();
  return useTotalSurplus(
    {
      address: account,
    },
    {
      enabled: !!account,
    }
  );
}
