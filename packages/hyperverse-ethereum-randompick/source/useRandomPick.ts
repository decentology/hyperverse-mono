import { useState, useEffect, useCallback } from 'react';
import { BigNumber, ethers } from 'ethers';
import { useEvm } from '@decentology/hyperverse-evm/react';
import { createContainer, useContainer } from '@decentology/unstated-next';
import { useEnvironment } from './environment';

type ContractState = ethers.Contract;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
function RandomPickState(initialState: { tenantId: string } = { tenantId: '' }) {
	const { tenantId } = initialState;
	const { address, signer, readOnlyProvider } = useEvm();
	const { ContractABI, contractAddress } = useEnvironment();
	const [contract, setRandomPickContract] = useState<ContractState>(
		new ethers.Contract(contractAddress!, ContractABI, readOnlyProvider) as ContractState
	);

	useEffect(() => {
		if (signer && contract) {
			const ctr = contract.connect(signer) as ContractState;
			setRandomPickContract(ctr);
		}
	}, [signer]);

	const startRandomPick = useCallback(
		async (numbers: Number[]) => {
			try {
				const tx = await contract.startRandomPick(numbers);
				const waited = await tx.wait();
				const event = waited.events.filter((x: any) => x.event == 'StartedRandomPick')[0];
				const requestId = event.args[1];
				return requestId;
			} catch (err) {
				throw err;
			}
		},
		[contract]
	);

	const getRandomPick = useCallback(
		async (requestId: string) => {
			return new Promise<number>(async (resolve, reject) => {
				try {
					if (!requestId) {
						return null;
					}
					let randomPick = (await contract.results(requestId)) as BigNumber;
					while (randomPick.toNumber() === 0) {
						await sleep(1000);
						randomPick = (await contract.results(requestId)) as BigNumber;
					}

					return resolve(randomPick.toNumber());
				} catch (err) {
					return reject(err);
				}
			});
		},
		[contract]
	);

	return {
		tenantId,
		contract,
		startRandomPick,
		getRandomPick,
	};
}

export const RandomPick = createContainer(RandomPickState);

export function useRandomPick() {
	return useContainer(RandomPick);
}
