import {useContext} from 'react';

import {Context} from './context/Algorand';

function useAlgorand() {
  return useContext(Context);
}

export default useAlgorand;