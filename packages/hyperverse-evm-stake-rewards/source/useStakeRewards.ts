import { useState, useEffect, useCallback } from 'react';
import { useEvent } from 'react-use';
import { createContainer, useContainer } from '@decentology/unstated-next';

import { useHyperverse } from '@decentology/hyperverse';
import { useEvm } from '@decentology/hyperverse-evm';
import { StakeRewardsLibrary, StakeRewardsLibraryType } from './stakeRewardsLibrary';

function StakeRewardsState(initialState: { tenantId: string } = { tenantId: '' }) {
	const { tenantId } = initialState;
	const { connectedProvider, readOnlyProvider } = useEvm();
	const hyperverse = useHyperverse();
	const [stakeRewardsLibrary, setStakeRewardsLib] = useState<StakeRewardsLibraryType>();

	useEffect(() => {
		const lib = StakeRewardsLibrary(hyperverse, connectedProvider || readOnlyProvider).then(
			setStakeRewardsLib
		);
		return lib.cancel;
	}, [connectedProvider]);

	const useStakeRewardsEvents = (eventName: string, callback: any) => {
		return useEvent(
			eventName,
			useCallback(callback, [stakeRewardsLibrary?.proxyContract]),
			stakeRewardsLibrary?.proxyContract
		);
	};

	return {
		...stakeRewardsLibrary,
		loading: !stakeRewardsLibrary,
		tenantId,
		useStakeRewardsEvents,
	};
}

export const StakeRewards = createContainer(StakeRewardsState);

export function useStakeRewards() {
	return useContainer(StakeRewards);
}
