import { useEffect, useRef, createContext, useContext, useState } from "react";
import {
  Web3Provider as EtherWeb3Provider,
  ExternalProvider,
} from "@ethersproject/providers";

declare global {
  interface Window {
    ethereum: ExternalProvider;
  }
}

export interface Web3Info {
  provider: EtherWeb3Provider;
  chainId: number;
  account: string;
}

export const Web3Context = createContext<Web3Info | null>(null);

export function useWeb3() {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
}

export type Web3ProviderProps = { children: React.ReactNode };

export function Web3Provider({ children }: Web3ProviderProps) {
  const [chainId, setChainId] = useState(1);
  const [account, setAccount] = useState<string>("");
  const provider = useRef<EtherWeb3Provider | null>(null);

  useEffect(() => {
    if (window.ethereum) {
      provider.current = new EtherWeb3Provider(window.ethereum);
    }
  }, []);

  useEffect(() => {
    if (provider.current) {
      provider.current.on("network", (network) => {
        setChainId(+network.chainId);
      });
      provider.current.listAccounts().then((accounts: string[]) => {
        setAccount(accounts[0]);
      });
    }
  }, []);

  const isUserConnected = !!account;
  const isChainSelected = !!chainId;

  return (
    <Web3Context.Provider
      value={{
        provider: provider.current as EtherWeb3Provider,
        chainId,
        account,
      }}
    >
      <div>chainId: {chainId}</div>
      <div>account: {account}</div>
      {children}
    </Web3Context.Provider>
  );
}
