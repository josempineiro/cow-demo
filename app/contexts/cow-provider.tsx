import { createContext, useContext, useMemo } from "react";
import { OrderBookApi, SupportedChainId } from "@cowprotocol/cow-sdk";
import { useWeb3 } from "~/contexts/web3-provider";

export type CowContextValue = {
  orderBookApi: OrderBookApi;
  chainId: number;
};

export const CowContext = createContext<CowContextValue | undefined>(undefined);

export function useCow() {
  const context = useContext(CowContext);
  if (!context) {
    throw new Error("useCow must be used within a CowProvider");
  }
  return context;
}

export type CowContextProps = { children: React.ReactNode };

export function CowProvider({ children }: CowContextProps) {
  const { chainId } = useWeb3();
  const orderBookApi = useMemo(() => {
    return new OrderBookApi({
      env: "prod",
      chainId,
    });
  }, [chainId]);
  const chain = Object.entries(SupportedChainId).find(([_, id]) => {
    return id === chainId;
  });
  return (
    <CowContext.Provider
      value={{
        chainId,
        orderBookApi,
      }}
    >
      {chain && <div>chain: {chain[0]}</div>}
      {children}
    </CowContext.Provider>
  );
}
