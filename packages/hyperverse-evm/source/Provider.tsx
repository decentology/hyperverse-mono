import '@rainbow-me/rainbowkit/styles.css';
import {
	apiProvider,
	configureChains,
	getDefaultWallets,
	RainbowKitProvider,
	darkTheme,
} from '@rainbow-me/rainbowkit';
import { chain, ProviderProps as WagmiProviderProps, createClient, WagmiProvider } from 'wagmi';
import { Evm } from './useEVM';
import { useHyperverse } from '@decentology/hyperverse';

export type ProviderProps = {
	children: React.ReactNode;
	networks?: any;
} & WagmiProviderProps &
	Parameters<typeof RainbowKitProvider>[0];

export { darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
export const Provider = ({ children, networks, ...props }: ProviderProps) => {
	const { network: defaultNetwork } = useHyperverse();

	/**
 wagmi chain Type:
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

	const { chains, provider } = configureChains(
		[
			{
				id: defaultNetwork.chainId,
				name: defaultNetwork.name,
				rpcUrls: {
					[defaultNetwork.rpcUrl]: defaultNetwork.rpcUrl,
				},
				blockExplorers: {
					default: { url: defaultNetwork.explorerUrl },
				},
				testnet: defaultNetwork.type === 'testnet',
			},
		],
		[
			apiProvider.jsonRpc(() => ({
				rpcUrl: defaultNetwork.networkUrl!,
			})),
			apiProvider.fallback(),
		]
	);

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
			<RainbowKitProvider
				chains={chains}
				showRecentTransactions={true}
				theme={darkTheme({
					accentColor: '#7b3fe4',
				})}
			>
				<Evm.Provider>{children}</Evm.Provider>
			</RainbowKitProvider>
		</WagmiProvider>
	);
};
