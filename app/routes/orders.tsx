import { useState } from "react";
import { Address } from "@cowprotocol/cow-sdk";
import { useOrders } from "~/hooks/use-orders";
import { useSearchParams } from "@remix-run/react";
import { useWeb3 } from "~/contexts/web3-provider";

export type OrdersQueryParams = {
  offset: number;
  limit: number;
  owner: Address;
};

function useOrdersQueryParams(
  ordersQueryParams: OrdersQueryParams
): [OrdersQueryParams, (ordersQueryParams: OrdersQueryParams) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const offset = searchParams.get("offset")
    ? parseInt(searchParams.get("offset") as string)
    : ordersQueryParams.offset;
  const limit = searchParams.get("limit")
    ? parseInt(searchParams.get("limit") as string)
    : ordersQueryParams.limit;
  const owner = searchParams.get("owner") || ordersQueryParams.owner;
  return [
    {
      offset,
      limit,
      owner,
    },
    (value: OrdersQueryParams) => {
      setSearchParams({
        offset: value.offset?.toString() ?? "",
        limit: value.limit?.toString() ?? "",
        owner: owner,
      });
    },
  ];
}

export default function Orders() {
  const { account } = useWeb3();
  const [{ offset, limit, owner }, setOrdersQueryParams] = useOrdersQueryParams(
    {
      offset: 0,
      limit: 10,
      owner: account,
    }
  );
  const [ownerInput, setOwnerInput] = useState<string>(owner || "");

  const { data, isLoading, isError } = useOrders(
    { offset, limit, owner: owner as string },
    {
      enabled: !!owner && limit >= 0,
    }
  );
  return (
    <div>
      <h1>Orders</h1>
      <input
        value={ownerInput}
        onChange={(event) => setOwnerInput(event.target.value)}
      />

      <button
        onClick={() => {
          setOrdersQueryParams({
            offset: 0,
            limit: 10,
            owner: ownerInput as Address,
          });
        }}
      >
        Search
      </button>
      <div>
        <button
          onClick={() => {
            setOrdersQueryParams({
              ...{ offset: 0, limit: 10 },
              owner: ownerInput as Address,
            });
          }}
        >
          10
        </button>
        <button
          onClick={() => {
            setOrdersQueryParams({
              ...{ offset: 0, limit: 25 },
              owner: ownerInput as Address,
            });
          }}
        >
          25
        </button>
        <button
          onClick={() => {
            setOrdersQueryParams({
              ...{ offset: 0, limit: 50 },
              owner: ownerInput as Address,
            });
          }}
        >
          50
        </button>
      </div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading orders</p>}
      {data && (
        <>
          {data.length === 0 && <p>No orders found</p>}
          {data.length > 0 && (
            <ul>
              {data.map((order) => (
                <li key={order.creationDate}>{order.creationDate}</li>
              ))}
            </ul>
          )}
          {data.length > 0 && (
            <button
              onClick={() => {
                setOrdersQueryParams({
                  ...{ offset: offset + 10, limit: limit },
                  owner: ownerInput as Address,
                });
              }}
            >
              Load more
            </button>
          )}
        </>
      )}
    </div>
  );
}
