import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Address, TotalSurplus } from "@cowprotocol/cow-sdk";
import { useCow } from "~/contexts/cow-provider";

export type UseSurplusOptions = {
  address: Address;
};

export function useTotalSurplus(
  { address }: UseSurplusOptions,
  options?: Omit<
    UseQueryOptions<TotalSurplus, Error, never>,
    "queryKey" | "queryFn"
  >
) {
  const { orderBookApi, chainId } = useCow();
  return useQuery<TotalSurplus, Error>({
    ...options,
    queryKey: ["surplus", chainId, address],
    queryFn: () => orderBookApi.getTotalSurplus(address),
  });
}
