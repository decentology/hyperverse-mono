import { networks, useHyperverse } from "@decentology/hyperverse";

const environment = {
  [networks.Mainnet]: {
    appID: 448458617,
  },
  [networks.Testnet]: {
    appID: 45445115,
  },
};

function useEnvironment() {
  const hyperverse = useHyperverse();
  return hyperverse.network == networks.Testnet
    ? environment[networks.Testnet]
    : environment[networks.Mainnet];
}

export { environment, useEnvironment };
