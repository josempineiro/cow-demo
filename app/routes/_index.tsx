import type { MetaFunction } from "@remix-run/node";
import { QueryClientProvider } from "~/contexts/query-client-provider";
import { CowProvider } from "~/contexts/cow-provider";
import { TotalSurplusLabel } from "~/components/total-surplus-label";
import { Web3Provider } from "~/contexts/web3-provider";
import Orders from "./orders";

export const meta: MetaFunction = () => {
  return [
    { title: "Cow swap demo" },
    { name: "description", content: "Cow swap demo!" },
  ];
};

export default function Index() {
  return (
    <Web3Provider>
      <CowProvider>
        <QueryClientProvider>
          <TotalSurplusLabel />
          <Orders />
        </QueryClientProvider>
      </CowProvider>
    </Web3Provider>
  );
}
