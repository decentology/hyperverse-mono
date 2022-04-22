import { HyperverseConfig } from "@decentology/hyperverse";
import { BaseLibrary, getProvider } from "@decentology/hyperverse-evm";
import { ethers } from "ethers";
import { CancellablePromise } from "real-cancellable-promise";
import { getEnvironment } from "../environment";

export type ModuleLibraryType = Awaited<ReturnType<typeof ModuleLibraryInternal>>;
export function ModuleLibrary(...args: Parameters<typeof ModuleLibraryInternal>): CancellablePromise<ModuleLibraryType> {
	return new CancellablePromise(ModuleLibraryInternal(...args), () => { });
}

async function ModuleLibraryInternal(
	hyperverse: HyperverseConfig,
	providerOrSigner?: ethers.providers.Provider | ethers.Signer
) {
	const { FactoryABI, factoryAddress, ContractABI } = getEnvironment(
		hyperverse.blockchain?.name!,
		hyperverse.network
	);
	if (!providerOrSigner) {
		providerOrSigner = getProvider(hyperverse.network);
	}
	const base = await BaseLibrary(
		hyperverse,
		factoryAddress!,
		FactoryABI,
		ContractABI,
		providerOrSigner
	);

	return {
		...base
	}
}

