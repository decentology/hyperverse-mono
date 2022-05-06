import '@rainbow-me/rainbowkit/styles.css';
import {
	apiProvider,
	configureChains,
	getDefaultWallets,
	RainbowKitProvider,
	darkTheme,
	lightTheme,
} from '@rainbow-me/rainbowkit';
import { chain, ProviderProps as WagmiProviderProps, createClient, WagmiProvider } from 'wagmi';
import { Evm } from './useEVM';
import { providers } from 'ethers';

const INFURA_ID = process.env.INFURA_API_KEY! || 'fb9f66bab7574d70b281f62e19c27d49';

export type ProviderProps = {
	children: React.ReactNode;
} & WagmiProviderProps &
	Parameters<typeof RainbowKitProvider>[0];

export { darkTheme, lightTheme };

export const Provider = ({ children, ...props }: ProviderProps) => {
	//network testnet -> chain type
	// const { chains, ...otherProps } = props;

	// const { network } = useHyperverse();

	// const newChain: Chain[] = [
	// 	// { ...chain.mainnet, name: network.name!, rpcUrls: [network.networkUrl!] },
	// 	{ ...chain.rinkeby, name: network.name!, rpcUrls: [network.networkUrl!] },
	// ];

	const { chains } = configureChains(
		[chain.mainnet, chain.rinkeby],
		[apiProvider.infura(INFURA_ID), apiProvider.fallback()]
	);

	const { connectors } = getDefaultWallets({
		appName: 'Hyperverse',
		chains,
	});

	const wagmiClient = createClient({
		connectors,
		provider() {
      //this defaults it, currently have it on Rinkeby but when I try to look at wagmiClient when I switch from rinkeby to mainnet, the connection link is still rinkeby
			return new providers.InfuraProvider(-1, INFURA_ID);
		},
    //not sure if this helps or does anything tbh
		jsonRpcUrl: ({ chainId }: { chainId: any }) =>
			chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ?? chain.mainnet.rpcUrls[0],
	});


	return (
		<WagmiProvider client={wagmiClient} {...props}>
			{console.log(wagmiClient.provider)}
			<RainbowKitProvider chains={chains}>
				<Evm.Provider>{children}</Evm.Provider>
			</RainbowKitProvider>
		</WagmiProvider>
	);
};
