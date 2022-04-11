import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery, useMutation, UseMutationOptions } from 'react-query';
import { constants, ethers } from 'ethers';
import { createContainer, useContainer } from '@decentology/unstated-next';
import { useEnvironment } from './environment';
import { useEvm } from '@decentology/hyperverse-evm';
import { ModuleLibrary } from './library/ModuleLibrary';
import { useHyperverse } from '@decentology/hyperverse';
import { Web3Provider } from '@ethersproject/providers';

type ContractState = ethers.Contract;

function ModuleState(initialState: { tenantId: string } = { tenantId: '' }) {
	const { tenantId } = initialState;
	const { address, connectedProvider, readOnlyProvider } = useEvm();
	const hyperverse = useHyperverse();
	const [hyperverseModule, setHyperverseModule] = useState<ModuleLibrary>(

		new ModuleLibrary(hyperverse, connectedProvider || readOnlyProvider)
	);

	const [proxyContract, setProxyContract] = useState<ContractState>();

	useEffect(() => {
		const provider = connectedProvider || readOnlyProvider;
		let signer: ethers.Signer | undefined;
		if (provider instanceof Web3Provider) {
			signer = provider.getSigner()
		}
		setHyperverseModule(
			new ModuleLibrary(hyperverse, signer || provider)

		)
	}, [readOnlyProvider, connectedProvider])


	return {
		tenantId,
		factoryContract: hyperverseModule.factoryContract,
		proxyContract: hyperverseModule.proxyContract,
		CheckInstance: () =>
			useQuery(
				['checkInstance', address, hyperverseModule.factoryContract?.address],
				() => hyperverseModule.checkInstance(address),
				{
					enabled: !!address && !!hyperverseModule.factoryContract?.signer,
				}
			),
		NewInstance: (
			options?: Omit<
				UseMutationOptions<unknown, unknown, { account: string }, unknown>,
				'mutationFn'
			>
		) => useMutation(({ account }) => hyperverseModule.createInstance(account), options),
		TotalTenants: () =>
			useQuery(
				['totalTenants', hyperverseModule.factoryContract?.address],
				() => hyperverseModule.getTotalTenants(),
				{
					enabled: !!hyperverseModule.factoryContract?.address,
				}
			),
	};
}

export const Module = createContainer(ModuleState);

export function useModule() {
	return useContainer(Module);
}
