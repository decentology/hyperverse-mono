import { useCallback, useEffect, useRef, useState } from 'react';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { providers, ethers } from 'ethers';
import { createContainer, useContainer } from 'unstated-next';
import { useHyperverse, networks } from '@decentology/hyperverse';

const INFURA_ID = process.env.INFURA_API_KEY! || 'fb9f66bab7574d70b281f62e19c27d49';

const providerOptions = {
	walletconnect: {
		package: WalletConnectProvider, // required
		options: {
			infuraId: INFURA_ID, // required
		},
	},
};

let web3Modal: Web3Modal;
if (typeof window !== 'undefined') {
	web3Modal = new Web3Modal({
		network: 'mainnet', // optional
		cacheProvider: true,
		providerOptions, // required
	});
}

type State = {
	provider: any | null;
	web3Provider: providers.Web3Provider | null;
	address: string | null;
	chainId: number | null;
	error: Error | null;
};

const switchNetwork = async (network: networks, prov: any) => {
	if (network === networks.Mainnet) {
		await prov.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: '0x1' }],
		});
	} else {
		await prov.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: '0x4' }],
		});
	}
};

function EthereumState() {
	const { network } = useHyperverse();
	const infuraNetwork = network === networks.Mainnet ? 'mainnet' : 'rinkeby';
	const [state, setState] = useState<State>({
		provider: new ethers.providers.JsonRpcProvider(`https://${infuraNetwork}.infura.io/v3/${INFURA_ID}`),
		web3Provider: null,
		address: null,
		chainId: null,
		error: null,
	});
	const { provider } = state;
	const addressRef = useRef(state.address);
	addressRef.current = state.address;

	const connect = useCallback(async function () {
		try {
			// This is the initial `provider` that is returned when
			// using web3Modal to connect. Can be MetaMask or WalletConnect.
			const externalProvider = await web3Modal.connect();

			// We plug the initial `provider` into ethers.js and get back
			// a Web3Provider. This will add on methods from ethers.js and
			// event listeners such as `.on()` will be different.
			const web3Provider = new providers.Web3Provider(externalProvider);

			const signer = web3Provider.getSigner();
			const address = await signer.getAddress();

			const userNetwork = await web3Provider.getNetwork();

			// if (userNetwork.chainId !== 4) {
			// 	await switchNetwork(network, web3Provider.provider);

			// 	setTimeout(() => {
			// 		window.location.reload();
			// 	}, 1000);
			// }

			setState((prev) => ({
				...prev,
				provider,
				web3Provider: web3Provider,
				address,
				chainId: userNetwork.chainId,
			}));
		} catch (err: any) {
			if (typeof err === 'string') {
				setState((prev) => ({
					...prev,
					error: new Error(err),
				}));
			} else if (
				err.message.includes('User Rejected') ||
				err.message.includes('Already processing')
			) {
				setState((prev) => ({
					...prev,
					error: new Error('Please click the metamask extension to sign in!'),
				}));
			} else {
				setState((prev) => ({
					...prev,
					error: new Error('Something went wrong!'),
				}));
			}
		}
	}, []);

	const disconnect = useCallback(async () => {
		await web3Modal.clearCachedProvider();
		const web3InnerProvider = state.web3Provider?.provider as any;
		if (typeof web3InnerProvider?.disconnect === 'function') {
			await web3InnerProvider.disconnect();
		}

		setState((prevState) => ({
			...prevState,
			web3Provider: null,
			address: null,
			chainId: null,
			error: null,
		}));
		window.location.reload();
	}, [state.web3Provider]);

	useEffect(() => {
		if (web3Modal) {
			// @ts-ignore - Using private method to override click event handler
			const web3ModalUserOptions = web3Modal.userOptions.find(
				(x: any) => x.name === 'MetaMask'
			);
			if (web3ModalUserOptions) {
				const click = web3ModalUserOptions.onClick;
				web3ModalUserOptions.onClick = () => {
					const timeout = setTimeout(() => {
						// If not triggered in second(s) show alert to user
						(window as Window).removeEventListener('blur', blur);
						if (!addressRef.current) {
							setState((prev) => ({
								...prev,
								error: new Error('Please click the metamask extension to sign in!'),
							}));
						}
					}, 500);
					const blur = () => {
						clearTimeout(timeout);
						(window as Window).removeEventListener('blur', blur);
					};
					(window as Window).addEventListener('blur', blur);
					// Call original click event handler to trigger metamask
					click();
				};
			}
		}
	}, [web3Modal]);

	// Auto connect to the cached provider
	useEffect(() => {
		if (web3Modal.cachedProvider) {
			connect();
		}
	}, [connect]);

	// A `provider` should come with EIP-1193 events. We'll listen for those events
	// here so that when a user switches accounts or networks, we can update the
	// local React state with that new information.
	useEffect(() => {
		// MetaMask Only
		const provider = state.web3Provider?.provider as any;
		if (provider?.on) {
			const handleAccountsChanged = (accounts: string[]) => {
				setState((prev) => ({ ...prev, address: accounts[0] }));
				// disconnect();
			};

			// https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
			const handleChainChanged = (_hexChainId: string) => {
				window.location.reload();
			};

			const handleDisconnect = (error: { code: number; message: string }) => {
				web3Modal.clearCachedProvider();
				disconnect();
			};

			provider.on('accountsChanged', handleAccountsChanged);
			provider.on('chainChanged', handleChainChanged);
			provider.on('disconnect', handleDisconnect);

			// Subscription Cleanup
			return () => {
				if (provider.removeListener) {
					provider.removeListener('accountsChanged', handleAccountsChanged);
					provider.removeListener('chainChanged', handleChainChanged);
					provider.removeListener('disconnect', handleDisconnect);
				}
			};
		}
	}, [state.web3Provider, disconnect]);
	return { ...state, connect, disconnect };
}

const Ethereum = createContainer(EthereumState);
export const Provider = Ethereum.Provider;
export function useEthereum() {
	return useContainer(Ethereum);
}
