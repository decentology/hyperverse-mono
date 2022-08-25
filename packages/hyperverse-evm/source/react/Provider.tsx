import { getDefaultWallets, RainbowKitProvider, darkTheme, wallet, connectorsForWallets } from '@rainbow-me/rainbowkit';
import { createClient, configureChains, WagmiConfig, chain } from 'wagmi';
import { Evm } from './useEVM';
import { Network, useHyperverse } from '@decentology/hyperverse/react';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { useMemo } from 'react';
export type ProviderProps = {
	children: React.ReactNode;
	networks?: any;
} & Partial<Parameters<typeof RainbowKitProvider>[0]>;

export const Provider = ({ children, networks, ...props }: ProviderProps) => {
	const { network: defaultNetwork } = useHyperverse();
	const { chains, provider } = useMemo(
		() =>
			configureChains(
				[
					{
						id: defaultNetwork.chainId!,
						name: defaultNetwork.name!,
						network: defaultNetwork.name!,
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
			),
		[defaultNetwork]
	);

	const { wallets } = useMemo(
		() =>
			getDefaultWallets({
				appName: 'Hyperverse',
				chains,
			}),
		[chains]
	);

	const connectors = connectorsForWallets([
		...wallets,
		{
			groupName: 'More',
			wallets: [
				wallet.argent({ chains }),
				wallet.trust({ chains }),
				wallet.steak({ chains }),
				wallet.imToken({ chains }),
				wallet.ledger({ chains }),
				wallet.brave({ chains }),
			],
		},
	]);


	const wagmiClient = useMemo(
		() =>
			createClient({
				autoConnect: true,
				connectors,
				provider,
			}),
		[chains]
	);

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
