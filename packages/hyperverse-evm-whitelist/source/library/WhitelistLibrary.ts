import { HyperverseConfig } from '@decentology/hyperverse'
import { BaseLibrary, getProvider } from '@decentology/hyperverse-evm'
import { ethers } from 'ethers'
import { getEnvironment } from '../environment'
import { MetaData } from '../types'

export type WhitelistLibraryType = Awaited<ReturnType<typeof WhitelistLibrary>>;
export async function WhitelistLibrary(
  hyperverse: HyperverseConfig,
  providerOrSigner?: ethers.providers.Provider | ethers.Signer
){

  const {FactoryABI, factoryAddress, ContractABI} = getEnvironment(
    hyperverse.blockchain?.name!,
    hyperverse.network
  );


  if (!providerOrSigner) {
    providerOrSigner = getProvider(hyperverse.network);
  }

  const base = await BaseLibrary(hyperverse, factoryAddress!, FactoryABI, ContractABI, providerOrSigner);


  const errors = (err: any) => {
    if (!base.factoryContract?.signer) {
			throw new Error('Please connect your wallet!');
		}

		if (err.code === 4001) {
			throw new Error('You rejected the transaction!');
		}

		throw err;
  }


  return {
    ...base,
  }

}