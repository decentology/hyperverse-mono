import { useState, useEffect } from 'react';
import { createContainer, useContainer } from '@decentology/unstated-next';
import { useEvm } from '@decentology/hyperverse-evm';
import { ModuleLibrary, ModuleLibraryType } from './library/ModuleLibrary';
import { useHyperverse } from '@decentology/hyperverse';

function ModuleState(initialState: { tenantId: string } = { tenantId: '' }) {
	const { tenantId } = initialState;
	const { address, connectedProvider, readOnlyProvider } = useEvm();
	const hyperverse = useHyperverse();
	const [hyperverseModule, setHyperverseModule] = useState<ModuleLibraryType>();


	useEffect(() => {
		const lib = ModuleLibrary(hyperverse, connectedProvider || readOnlyProvider).then(setHyperverseModule)
		return lib.cancel;
	}, [connectedProvider])


	return {
		...hyperverseModule,
		tenantId,
	};
}

export const Module = createContainer(ModuleState);

export function useModule() {
	return useContainer(Module);
}
