import { useContext } from 'react';
import { Context } from './Provider';

function useHook() {
	const context = useContext(Context);
	return context;
}

export default useHook;
