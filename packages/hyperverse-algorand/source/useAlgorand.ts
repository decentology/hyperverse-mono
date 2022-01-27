import {useContext} from 'react';

import {Context} from './context/Provider';

function useAlgorand() {
  return useContext(Context);
}

export default useAlgorand;