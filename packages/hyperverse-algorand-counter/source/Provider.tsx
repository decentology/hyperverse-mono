import React, { FC } from "react";
import { HyperverseModuleInstance } from "@decentology/hyperverse";
import { useAlgorand } from "@decentology/hyperverse-algorand";
import { useEnvironment } from "./environment";
import * as actions from "./actions";
import * as bundle from "./bundle";

type AlgorandConterContext = {
  appID: number;
  add: typeof actions.add;
  deduct: typeof actions.deduct;
  fetchCount: typeof actions.fetchCount;
  deploy: typeof bundle.deploy;
} | null;

const Context = React.createContext<AlgorandConterContext>(null);
Context.displayName = "AlgorandCounterContext";

const Provider: FC<HyperverseModuleInstance> = (props) => {
  const environment = useEnvironment();
  const algorand = useAlgorand();

  return (
    <Context.Provider
      value={{
        appID: environment.appID,
        deploy: bundle.deploy.bind(null, {
          environment,
          algorand,
          account: algorand?.state.account,
        }),
        add: actions.add.bind(null, {
          environment,
          algorand,
          account: algorand?.state.account,
        }),
        deduct: actions.deduct.bind(null, {
          environment,
          algorand,
          account: algorand?.state.account,
        }),
        fetchCount: actions.fetchCount.bind(null, {
          environment,
          algorand,
          account: algorand?.state.account,
        }),
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export { Context, Provider };
