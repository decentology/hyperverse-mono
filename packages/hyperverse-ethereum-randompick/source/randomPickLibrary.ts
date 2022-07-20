import { HyperverseConfig } from '@decentology/hyperverse';
import { EvmLibraryBase, getProvider } from '@decentology/hyperverse-evm';
import { BigNumber, ethers } from 'ethers';
import { TransactionReceipt } from '@ethersproject/abstract-provider'
import { CancellablePromise, pseudoCancellable } from 'real-cancellable-promise';
import { getEnvironment } from './environment';

export type RandomPickType = Awaited<ReturnType<typeof RandomPickInternal>>;
export function RandomPickLibrary(...args: Parameters<typeof RandomPickInternal>): CancellablePromise<RandomPickType> {
	return pseudoCancellable(RandomPickInternal(...args));
}

export async function RandomPickInternal(
	hyperverse: HyperverseConfig,
	providerOrSigner?: ethers.providers.Provider | ethers.Signer
) {
	const { ContractABI, contractAddress } = getEnvironment(
		hyperverse.blockchain?.name!,
		hyperverse.network
	);

	if (!contractAddress) {
		throw new Error('Contract address is not set');
	}

	const contract = new ethers.Contract(contractAddress, ContractABI, providerOrSigner);


	const startRandomPick = async (numbers: Number[]) => {
		try {
			const tx = await contract.startRandomPick(numbers);
			const waited = await tx.wait();
			const event = waited.events.filter((x: any) => x.event == 'StartedRandomPick')[0];
			const requestId = event.args[1];
			return requestId;
		} catch (err) {
			throw err;
		}
	}

	const getRandomPick = async (requestId: string) => {
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
	};


	return {
		startRandomPick,
		getRandomPick,
		contractAddress,
		contract
	}


}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
