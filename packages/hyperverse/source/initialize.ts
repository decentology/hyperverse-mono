import { Hyperverse, HyperverseModuleBase, networks } from ".";

function initialize(options: Hyperverse) {
  if (!options.network) {
    options.network = networks.Testnet;
  }
  return options;
}

export default initialize;
