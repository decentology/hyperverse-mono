import Web3Modal from '@decentology/web3modal';
import WalletConnectProvider from '@walletconnect/ethereum-provider';
import { providers, ethers } from 'ethers';
import { createContainer, useContainer } from '@decentology/unstated-next';
import { Network, NetworkConfig, useHyperverse } from '@decentology/hyperverse';
import '@rainbow-me/rainbowkit/styles.css';

import { useAccount, useProvider, useSigner, useEnsLookup } from 'wagmi';
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
	// const readOnlyProvider = useProvider();
	const readOnlyProvider = getProvider(network);
	const [account] = useAccount();

	const address = account?.data?.address;

	const [{ data: ens }] = useEnsLookup({ address });

	const [{ data: signer }] = useSigner();

	return { Connect: ConnectButton, readOnlyProvider, connectedProvider: null, signer, account: address, address:address, ens: ens, error: account.error };
}

export const Evm = createContainer(EvmState);
export const Provider = Evm.Provider;
export function useEvm() {
	return useContainer(Evm);
}
