import { useState } from "react";
import { Address } from "@cowprotocol/cow-sdk";
import { useOrders } from "~/hooks/use-orders";
import { useSearchParams } from "@remix-run/react";

function useOrderQueryParams(): {
  offset: number;
  limit: number;
  owner?: Address;
  setOffset: (offset: number) => void;
  setOwner: (owner: Address) => void;
  setLimit: (limit: number) => void;
} {
  const [searchParams, setSearchParams] = useSearchParams();
  const offset = searchParams.get("offset");
  const limit = searchParams.get("limit");
  const owner = searchParams.get("owner");
  return {
    offset: offset ? parseInt(offset) : -1,
    limit: limit ? parseInt(limit) : 10,
    owner: owner ? (owner as Address) : undefined,
    setOffset: (offset: number) => {
      searchParams.set("offset", offset.toString());
      setSearchParams(searchParams);
    },
    setOwner: (owner: Address) => {
      searchParams.set("owner", owner);
      setSearchParams(searchParams);
    },
    setLimit: (limit: number) => {
      searchParams.set("limit", limit.toString());
      setSearchParams(searchParams);
    },
  };
}

export default function Orders() {
  const { offset, limit, owner, setOwner, setLimit, setOffset } =
    useOrderQueryParams();
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
          setOwner(ownerInput);
        }}
      >
        Search
      </button>
      <div>
        <button
          onClick={() => {
            setLimit(10);
          }}
        >
          10
        </button>
        <button
          onClick={() => {
            setLimit(25);
          }}
        >
          25
        </button>
        <button
          onClick={() => {
            setLimit(50);
          }}
        >
          50
        </button>
      </div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading orders</p>}
      {data && (
        <div>
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
                setOffset(offset + 10);
              }}
            >
              Load more
            </button>
          )}
        </div>
      )}
    </div>
  );
}
