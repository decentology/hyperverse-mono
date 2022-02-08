import { createContext, createElement, FC, useEffect, useState } from "react";
import { Provider as SkyNetProvider } from "@decentology/hyperverse-storage-skynet";
import { DeviceDetectProvider } from "./components";
import Network from "./constants/networks";
import Storage from "./constants/storage";
import { Hyperverse } from "./types";
import { createContainer, useContainer } from "unstated-next";

function HyperverseState(
  initialState: Hyperverse = {
    blockchain: null,
    network: Network.TestNet,
    storage: Storage.Skynet,
    modules: [],
  }
) {
  return initialState;
}

const HyperverseContainer = createContainer(HyperverseState);
export function useHyperverse() {
  return HyperverseContainer.useContainer();
}

export const Provider: FC<{ initialState: Hyperverse }> = ({ children, initialState }) => {
  if (initialState.blockchain) {
    for (const module of initialState.modules.reverse()) {
      children = createElement(
        module.bundle.Provider,
        {
          tenantId: module.tenantId,
        },
        children
      );
    }

    children = createElement(SkyNetProvider, null, children);
    children = createElement(initialState.blockchain.Provider, null, children);

    return (
      <HyperverseContainer.Provider>
        <DeviceDetectProvider>{children}</DeviceDetectProvider>
      </HyperverseContainer.Provider>
    );
  }
  return null;
};
