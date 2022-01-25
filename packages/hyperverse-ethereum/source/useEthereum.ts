import { useContext } from "react";
import { Context } from "./Provider";
function useEthereum() {
  return useContext(Context);
}
export default useEthereum;
