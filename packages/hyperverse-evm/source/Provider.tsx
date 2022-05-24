import '@rainbow-me/rainbowkit/styles.css';
import {
	apiProvider,
	configureChains,
	getDefaultWallets,
	RainbowKitProvider,
	darkTheme,
} from '@rainbow-me/rainbowkit';
import { chain, WagmiConfigProps , createClient, WagmiConfig } from 'wagmi';
import { Evm } from './useEVM';
import { useHyperverse } from '@decentology/hyperverse';

export type ProviderProps = {
	children: React.ReactNode;
	networks?: any;
}
export const Provider = ({ children, networks, ...props }: ProviderProps) => {
	const { network: defaultNetwork } = useHyperverse();
	const { chains, provider } = configureChains(
		[
			{
				id: defaultNetwork.chainId!,
				network: 'Default',
				name: defaultNetwork.name!,
				rpcUrls: {
					default: defaultNetwork.networkUrl!,
				},
				blockExplorers: {
					etherscan: {
						name: 'Default',
						url: defaultNetwork.blockExplorer!,
					},
					default: {
						name: 'Default',
						url: defaultNetwork.blockExplorer!,
					},
				},
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
	
	const wagmiClient = createClient();

	// const wagmiClient = createClient({
	// 	autoConnect: true,
	// 	connectors,
	// 	provider,

	// 	// jsonRpcUrl: ({ chainId }: { chainId: any }) =>
	// 	// 	chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ?? chain.mainnet.rpcUrls[0],
	// });

	return (
		<WagmiConfig client={wagmiClient} {...props}>
			<RainbowKitProvider
				chains={chains}
				showRecentTransactions={true}
				theme={
					// @ts-ignore
					props.theme ||
					darkTheme({
						accentColor: '#999',
					})
				}
			>
				<Evm.Provider>{children}</Evm.Provider>
			</RainbowKitProvider>
		</WagmiConfig>
	);
};
