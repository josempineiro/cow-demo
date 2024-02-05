import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Address, TotalSurplus } from "@cowprotocol/cow-sdk";
import { useCow } from "~/contexts/cow-provider";

export type UseSurplusOptions = {
  account: Address;
};

export function useTotalSurplus(
  {
    address,
  }: {
    address: Address;
  },
  options?: Omit<
    UseQueryOptions<TotalSurplus, Error, never>,
    "queryKey" | "queryFn"
  >
) {
  const { orderBookApi } = useCow();
  return useQuery<TotalSurplus, Error>({
    ...options,
    queryKey: ["surplus", address],
    queryFn: () => orderBookApi.getTotalSurplus(address),
  });
}
