import {networks, useHyperverse} from '@decentology/hyperverse';

const environment = {
  [networks.Mainnet]: {
    appID: 448458617
  },
  [networks.Testnet]: {
    appID: 45445115
  }
};

function useEnvironment() {
  const hyperverse = useHyperverse();
  return environment[hyperverse.network];
}

export {
  environment,
  useEnvironment
};