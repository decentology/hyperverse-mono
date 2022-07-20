import { useState, useEffect, useCallback } from 'react';
import { useEvent } from 'react-use';
import { createContainer, useContainer } from '@decentology/unstated-next';

import { useHyperverse } from '@decentology/hyperverse/react';
import { useEvm } from '@decentology/hyperverse-evm/react';
import { StakeRewardsLibrary, StakeRewardsLibraryType } from '../stakeRewardsLibrary';

function StakeRewardsState(initialState: { tenantId: string } = { tenantId: '' }) {
	const { tenantId } = initialState;
	const { readOnlyProvider, signer } = useEvm();
	const hyperverse = useHyperverse();
	const [stakeRewardsLibrary, setStakeRewardsLibrary] = useState<StakeRewardsLibraryType>();

	useEffect(() => {
		const lib = StakeRewardsLibrary(hyperverse, signer || readOnlyProvider).then(setStakeRewardsLibrary).catch(x => {
			// Ignoring stale library instance
		});

		return lib.cancel;
	}, [signer, readOnlyProvider])

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
