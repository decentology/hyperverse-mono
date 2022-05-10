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
import { useHyperverse } from '@decentology/hyperverse';

const INFURA_ID = process.env.INFURA_API_KEY! || 'fb9f66bab7574d70b281f62e19c27d49';

export type ProviderProps = {
	children: React.ReactNode;
	networks?: any,
} & WagmiProviderProps &
	Parameters<typeof RainbowKitProvider>[0];

export { darkTheme, lightTheme };

export const Provider = ({ children, networks, ...props }: ProviderProps) => {

	const { network: defaultNetwork } = useHyperverse();

	// console.log('networks',networks)
	// console.log('network',defaultNetwork)
	
/**
  id: number
  name: AddEthereumChainParameter['chainName']
  nativeCurrency?: AddEthereumChainParameter['nativeCurrency']
  rpcUrls: { [key in RpcProviderName]?: string } & {
    [key: string]: string
    default: string
  }
  blockExplorers?: {
    [key in BlockExplorerName]: BlockExplorer
  } & {
    [key: string]: BlockExplorer
    default: BlockExplorer
  }
  testnet?: boolean
 */


	// const newChain: Chain[] = [
	// 	// { ...chain.mainnet, name: network.name!, rpcUrls: [network.networkUrl!] },
	// 	{ ...chain.rinkeby, name: network.name!, rpcUrls: [network.networkUrl!] },
	// ];

	//switch chains to use networks
	const { chains, provider } = configureChains(
		[ chain.rinkeby],
		[apiProvider.jsonRpc(() => ({
			rpcUrl: defaultNetwork.networkUrl!
		})), apiProvider.fallback()]
	);

	// console.log('provider',provider, )

	const { connectors } = getDefaultWallets({
		appName: 'Hyperverse',
		chains,
	});

	const wagmiClient = createClient({
		autoConnect: true,
		connectors,
		provider,
    //not sure if this helps or does anything tbh
		jsonRpcUrl: ({ chainId }: { chainId: any }) =>
			chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ?? chain.mainnet.rpcUrls[0],
	});


	return (
		<WagmiProvider client={wagmiClient} {...props}>
			<RainbowKitProvider chains={chains} showRecentTransactions={true}>
				<Evm.Provider>{children}</Evm.Provider>
			</RainbowKitProvider>
		</WagmiProvider>
	);
};
