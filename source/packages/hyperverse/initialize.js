import * as fcl from '@onflow/fcl';

function initialize(options) {
  return new Promise(async (resolve, reject) => {
    // Flow
    if (options.blockchain === 'Flow') {
      if (options.network === 'Mainnet') {
        fcl.config()
          .put('accessNode.api', 'https://flow-access-mainnet.portto.io')
          .put('discovery.wallet', 'https://flow-wallet.blocto.app/authn')
          .put('0xFungibleToken', '0xf233dcee88fe0abe')
          .put('0xFlowToken', '0x1654653399040a61');
      } else if (options.network === 'Testnet') {
        fcl.config()
          .put('accessNode.api', 'https://access-testnet.onflow.org')
          .put('discovery.wallet', 'https://flow-wallet-testnet.blocto.app/authn')
          .put('0xFungibleToken', '0x9a0766d93b6608b7')
          .put('0xFlowToken', '0x7e60df042a9c0868');
      }
      
      // Make sure we're ready.
      const accessNode = await fcl.config().get('accessNode.api');
      if (typeof accessNode !== 'undefined') {
        resolve(options);
      } else {
        reject();
      }
    }
  });
}

export default initialize;