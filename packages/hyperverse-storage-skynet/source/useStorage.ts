import { useContext } from "react";
import { Context } from "./Provider";
function useStorage() {
  return useContext(Context);
}
export default useStorage;
