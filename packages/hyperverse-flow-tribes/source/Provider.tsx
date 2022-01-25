import React, { FC } from 'react';
import * as fcl from '@onflow/fcl';
import {HyperverseModuleInstance, networks, useHyperverse} from '@decentology/hyperverse';
import * as actions from './actions';

const Context = React.createContext(null);

const Provider: FC<HyperverseModuleInstance> = (props) => {
  const [isInitialized, setInitialized] = React.useState(null);

  let { network } = useHyperverse();

  const tenantId = props.tenantId;
  console.log("tenantId", tenantId);
  const initialize = async () => {
    if (network === networks.MainNet) {
      // TODO: Deploy to Flow Mainnet.
    } else if (network === networks.TestNet) {
      fcl.config()
        .put('0xTribes', '0x1960ff14acc51991');
    }
    
    const TribesAddress = await fcl.config().get('0xTribes');
    if (typeof TribesAddress !== 'undefined') {
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
    boundActions[actionName] = actions[actionName].bind(null, props.tenantId);
  }

  return (
    <Context.Provider
      value={{
        isInitialized,
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