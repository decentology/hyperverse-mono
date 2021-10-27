import React from 'react';

import * as Flow from './flow';

const Context = React.createContext(null);

function Provider(props) {
  const [hyperverse, setHyperverse] = React.useState(null);
  
  React.useEffect(() => {
    props.hyperverse.then((hyperverse) => setHyperverse(hyperverse));
  }, [props.hyperverse]);
  
  if (hyperverse) {
    if (hyperverse.blockchain === 'Flow') {
      let children = props.children;
      for (const module of hyperverse.modules) {
        children = React.createElement(
          module.package.Provider,
          {
            blockchain: hyperverse.blockchain,
            network: hyperverse.network,
            tenantID: module.tenantID
          },
          children
        );
      }
      return (
        <Context.Provider value={hyperverse}>
          <Flow.Provider>
            {children}
          </Flow.Provider>
        </Context.Provider>
      );
    }
  } else {
    return null;
  }
}

export {
  Context,
  Provider
};