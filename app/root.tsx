import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Web3Provider } from "~/contexts/web3-provider";
import { QueryClientProvider } from "~/contexts/query-client-provider";
import { CowProvider } from "~/contexts/cow-provider";
import { TotalSurplusLabel } from "~/components/total-surplus-label";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Web3Provider>
          <CowProvider>
            <QueryClientProvider>
              <TotalSurplusLabel />
              <Outlet />
              <ScrollRestoration />
              <Scripts />
              <LiveReload />
            </QueryClientProvider>
          </CowProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
