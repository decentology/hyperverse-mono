import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { createClient, configureChains, chain, WagmiConfig } from 'wagmi';
import { Evm } from './useEVM';
import { useHyperverse } from '@decentology/hyperverse';
import { publicProvider } from 'wagmi/providers/public';
import { infuraProvider } from 'wagmi/providers/infura';
export type ProviderProps = {
	children: React.ReactNode;
	networks?: any;
} & Partial<Parameters<typeof RainbowKitProvider>[0]>;
	

export const Provider = ({ children, networks, ...props }: ProviderProps) => {
	const { network: defaultNetwork } = useHyperverse();

	const { chains, provider } = configureChains(
		[
			{
				id: defaultNetwork.chainId!,
				name: defaultNetwork.name!,
				network: defaultNetwork.networkUrl!,
				rpcUrls: {
					default: defaultNetwork.networkUrl!,
				},
				blockExplorers: {
					default: {
						name: 'Block Explorer',
						url: defaultNetwork.blockExplorer!,
					},
				},
			},
		],
		[publicProvider()]
	);

	const { connectors } = getDefaultWallets({
		appName: 'ryperverse',
		chains,
	});

	const wagmiClient = createClient({
		autoConnect: true,
		connectors,
		provider,
	});


	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider
				chains={chains}
				showRecentTransactions={true}
				theme={
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
