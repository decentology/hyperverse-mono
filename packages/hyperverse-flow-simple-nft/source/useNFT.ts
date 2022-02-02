// https://play.onflow.org/3cd86822-8297-4df7-b275-76d2740b38eb
import { useContext } from 'react';
import { Context } from './Provider';

function useNFT() {
  const context = useContext(Context);
  return context;
}

export default useNFT;