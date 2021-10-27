import React from 'react';

import {Context} from './Provider.jsx';

function useSimpleNFT() {
  const context = React.useContext(Context);
  return context;
}

export default useSimpleNFT;