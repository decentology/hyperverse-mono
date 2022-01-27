import { networks, useHyperverse } from "@decentology/hyperverse";

const environment = {
  [networks.MainNet]: {
    appID: null,
  },
  [networks.TestNet]: {
    appID: null,
  },
};

function useEnvironment() {
  const hyperverse = useHyperverse();
  return environment[hyperverse.network];
}

export { environment, useEnvironment };
