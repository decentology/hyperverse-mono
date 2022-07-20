import { useState, useEffect } from 'react';
import { createContainer, useContainer } from '@decentology/unstated-next';

import { useEvm } from '@decentology/hyperverse-evm/react';
import { ModuleLibrary, ModuleLibraryType } from '../moduleLibrary';
import { useHyperverse } from '@decentology/hyperverse/react';

function ModuleState(initialState: { tenantId: string } = { tenantId: '' }) {
	const { tenantId } = initialState;
	const { readOnlyProvider, signer } = useEvm();
	const hyperverse = useHyperverse();
	const [moduleLibrary, setModuleLibrary] = useState<ModuleLibraryType>();

	useEffect(() => {
		const lib = ModuleLibrary(hyperverse, signer || readOnlyProvider).then(setModuleLibrary).catch(() => {

		})
		return lib.cancel;
	}, [signer, readOnlyProvider])

	return {
		...moduleLibrary,
		tenantId,
	};
}

export const Module = createContainer(ModuleState);

export function useModule() {
	return useContainer(Module);
}
