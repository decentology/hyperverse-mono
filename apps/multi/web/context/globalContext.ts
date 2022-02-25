import { createContext } from 'react';

type GlobalContext = {
	switchBlockchain: (name: 'flow' | 'ethereum' | 'metis') => void;
} | null;
const context = createContext<GlobalContext>(null);

export default context;
