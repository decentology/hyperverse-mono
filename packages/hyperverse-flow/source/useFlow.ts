import { useContext } from "react";

import {Context} from "./context/Provider";

function useFlow() {
  const context = useContext(Context);
  return context;
}

export default useFlow;
