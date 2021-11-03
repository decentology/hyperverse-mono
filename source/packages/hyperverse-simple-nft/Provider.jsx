import React from 'react';
import * as fcl from '@onflow/fcl';

import * as Package from './Package';
import * as actions from './actions';

const Context = React.createContext(null);

function Provider(props) {
  const [isInitialized, setInitialized] = React.useState(null);

  const initialize = async () => {
    if (props.blockchain === 'Flow') {
      if (props.network === 'Mainnet') {
        // TODO: Deploy to Flow Mainnet.
      } else if (props.network === 'Testnet') {
        fcl.config()
          .put('0xSimpleNFT', '0x26a365de6d6237cd');
      }
    }

    const SimpleNFTAddress = await fcl.config().get('0xSimpleNFT');
    if (typeof SimpleNFTAddress !== 'undefined') {
      setInitialized(true);
    } else {
      setInitialized(false);
    }
  };

  React.useEffect(() => {
    initialize();
  }, []);

  const boundActions = {};
  for (const actionName of Object.keys(actions)) {
    boundActions[actionName] = actions[actionName].bind(null, props.tenantID);
  }

  return (
    <Context.Provider
      value={{
        isInitialized,
        package: Package,
        ...boundActions
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export {
  Context,
  Provider
};