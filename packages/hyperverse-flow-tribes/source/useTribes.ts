
import { useContext } from 'react';
import { Context } from './Provider';

function useTribes() {
  const context = useContext(Context);
  return context;
}

export default useTribes;