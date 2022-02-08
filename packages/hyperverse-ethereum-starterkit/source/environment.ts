import { networks, useHyperverse } from "@decentology/hyperverse";

const environment = {
  [networks.Mainnet]: {
    appID: null,
  },
  [networks.Testnet]: {
    appID: null,
  },
};

function useEnvironment() {
  const hyperverse = useHyperverse();
  return environment[hyperverse.network];
}

export { environment, useEnvironment };
