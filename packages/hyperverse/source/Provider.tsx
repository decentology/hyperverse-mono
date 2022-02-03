import { createContext, createElement, FC, useEffect, useState } from "react";
import {Provider as SkyNetProvider } from '@decentology/hyperverse-storage-skynet'
import { DeviceDetectProvider } from "./components";
import Network from "./constants/networks";
import Storage from "./constants/storage";
import { Hyperverse } from "./types";

const Context = createContext<Hyperverse>({
  blockchain: null,
  storage: Storage.Skynet,
  network: Network.TestNet,
  modules: [],
});
Context.displayName = "HyperverseContext";

type ProviderProps = {
  hyperverse: Promise<Hyperverse>;
};

const Provider: FC<ProviderProps> = (props) => {
  const [hyperverse, setHyperverse] = useState<Hyperverse | null>(null);

  useEffect(() => {
    props.hyperverse.then((hyperverse) => {
      setHyperverse(hyperverse);
    });
  }, [props.hyperverse]);

  if (hyperverse?.blockchain) {
    let children = props.children;

    for (const module of hyperverse.modules.reverse()) {
      children = createElement(
        module.bundle.Provider,
        {
          tenantId: module.tenantId,
        },
        children
      );
    }

    // TODO Make this conditional
    children = createElement(SkyNetProvider, null, children);

    const blockchain = createElement(
      hyperverse.blockchain.Provider,
      null,
      children
    );

    return (
      <Context.Provider value={hyperverse}>
        <DeviceDetectProvider>{blockchain}</DeviceDetectProvider>
      </Context.Provider>
    );
  }
  return null;
};

export { Context, Provider };
