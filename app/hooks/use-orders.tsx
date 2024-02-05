import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Address, GetOrdersRequest, EnrichedOrder } from "@cowprotocol/cow-sdk";
import { useCow } from "~/contexts/cow-provider";

export type OrderParams = {
  offset?: number;
  limit?: number;
  owner: Address;
};

export type UseOrderOptions = GetOrdersRequest;

export function useOrders(
  { offset, limit, owner }: UseOrderOptions,
  options?: Omit<
    UseQueryOptions<EnrichedOrder[], Error, never>,
    "queryKey" | "queryFn"
  >
) {
  const { orderBookApi } = useCow();
  return useQuery<EnrichedOrder[], Error>({
    ...options,
    queryKey: ["orders", owner, offset, limit],
    queryFn: () =>
      orderBookApi.getOrders({
        owner,
        offset,
        limit,
      }),
  });
}
