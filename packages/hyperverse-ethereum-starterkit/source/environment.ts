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
  return hyperverse.network === networks.Mainnet ? environment[networks.Mainnet] : environment[networks.Testnet];
}

export { environment, useEnvironment };
