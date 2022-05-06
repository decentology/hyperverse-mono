import { createContainer, useContainer } from '@decentology/unstated-next';
import { Network, NetworkConfig, useHyperverse } from '@decentology/hyperverse';
import '@rainbow-me/rainbowkit/styles.css';

import { useAccount, useSigner, useEnsName, useProvider } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { getProvider } from './evmLibraryBase';

type InitialEvmState = {
	networks: {
		[Network.Mainnet]: NetworkConfig;
		[Network.Testnet]: NetworkConfig;
	};
};

function EvmState(
	initialState: InitialEvmState = {
		networks: {
			mainnet: {
				type: Network.Mainnet,
				name: '',
				networkUrl: '',
				chainId: -1,
			},
			testnet: {
				type: Network.Testnet,
				name: '',
				networkUrl: '',
				chainId: -1,
			},
		},
	}
) {
	
	const { network } = useHyperverse();

	//for later when rainbowkit uses new wagmi
	const readOnlyProvider = useProvider();
// console.log('readOnlyProvider2', readOnlyProvider);


	// const readOnlyProvider2 = getProvider(network);

	const {data: account, error: accountErr} = useAccount();

	const address = account?.address;

	const {data: ens} = useEnsName(address);

	const {data: signer} = useSigner();

	return { Connect: ConnectButton, readOnlyProvider, connectedProvider: null, signer, account: address, address:address, ens: ens, error: accountErr };
}

export const Evm = createContainer(EvmState);
export const Provider = Evm.Provider;
export function useEvm() {
	return useContainer(Evm);
}
