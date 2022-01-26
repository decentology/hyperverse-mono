//Contract Address : 0xf8CEc073d08e42cdDC1bF1fd8d44ce3252ab7352

import "../styles/globals.css";
import type { AppProps } from "next/app";
import * as Hyperverse from "@decentology/hyperverse";
import { networks } from "@decentology/hyperverse";
import { Ethereum } from "@decentology/hyperverse-ethereum";
import * as Tribes from "@decentology/hyperverse-ethereum-tribes";
import InnerComponent from "../components/InnerComponent";

function MyApp({ Component, pageProps }: AppProps) {
  const hyperverse = Hyperverse.initialize({
    blockchain: Ethereum,
    network: networks.TestNet,
    modules: [{ bundle: Tribes, tenantId: "tribes" }],
  });
  return (
    <Hyperverse.Provider hyperverse={hyperverse}>
      <InnerComponent>
        <Component {...pageProps} />
      </InnerComponent>
    </Hyperverse.Provider>
  );
}

export default MyApp;
