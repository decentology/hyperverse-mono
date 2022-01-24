import React, { FC } from 'react';
import * as fcl from '@onflow/fcl';
import {networks, useHyperverse} from '@decentology/hyperverse';

import * as actions from './actions';

type FlowTribesContext = {
  isInitialized: boolean;
} | null;

const Context = React.createContext<FlowTribesContext>(null);

type ProviderProps = {
  tenantID: string 
}

const Provider: FC<ProviderProps> = (props) => {
  const [isInitialized, setInitialized] = React.useState<boolean>(false);

  let { network } = useHyperverse();

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

  const boundActions = {} as typeof actions;
  for (const actionName in actions) {
    boundActions[actionName] = actions[actionName].bind(null, props.tenantID);
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