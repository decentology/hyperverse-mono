import "../styles/globals.css";
import type { AppProps } from "next/app";
import { initialize, networks, Provider } from "@decentology/hyperverse";
import { Flow } from "@decentology/hyperverse-flow";
import * as Tribes from "@decentology/hyperverse-flow-tribes";

function MyApp({ Component, pageProps }: AppProps) {
  const hyperverse = initialize({
    blockchain: Flow,
    network: networks.Testnet,
    modules: [{ bundle: Tribes, tenantId: "0x1960ff14acc51991" }],
  });
  return (
    <Provider initialState={hyperverse}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
