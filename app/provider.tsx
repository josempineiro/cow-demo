import { QueryClientProvider } from "~/contexts/query-client-provider";
import { CowProvider } from "~/contexts/cow-provider";
import { Web3Provider } from "~/contexts/web3-provider";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <Web3Provider>
      <CowProvider>
        <QueryClientProvider>{children}</QueryClientProvider>
      </CowProvider>
    </Web3Provider>
  );
}
