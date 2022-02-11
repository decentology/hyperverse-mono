//Contract Address : 0xf8CEc073d08e42cdDC1bF1fd8d44ce3252ab7352

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { initialize, Provider} from "@decentology/hyperverse";
import { networks } from "@decentology/hyperverse";
import { Ethereum } from "@decentology/hyperverse-ethereum";
import * as Tribes from "@decentology/hyperverse-ethereum-tribes";
import InnerComponent from "../components/InnerComponent";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  const hyperverse = initialize({
    blockchain: Ethereum,
    network: networks.Testnet,
    modules: [{ bundle: Tribes, tenantId: "0xD847C7408c48b6b6720CCa75eB30a93acbF5163D" }],
  });
  return (
    <Provider initialState={hyperverse}>
      <InnerComponent>
        <ToastContainer />
        <Component {...pageProps} />
      </InnerComponent>
    </Provider>
  );
}

export default MyApp;
