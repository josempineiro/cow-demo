import { QueryClientProvider } from "~/contexts/query-client-provider";
import { CowProvider } from "~/contexts/cow-provider";
import { TotalSurplusLabel } from "~/components/total-surplus-label";
import { Web3Provider } from "~/contexts/web3-provider";

export default function Surplus() {
  return (
    <Web3Provider>
      <CowProvider>
        <QueryClientProvider>
          <TotalSurplusLabel />
        </QueryClientProvider>
      </CowProvider>
    </Web3Provider>
  );
}
