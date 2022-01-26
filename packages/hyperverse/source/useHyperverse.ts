
import { useContext } from 'react';
import {Context} from './Provider';

function useHyperverse() {
  const hyperverse = useContext(Context);
  return hyperverse;
}

export default useHyperverse;