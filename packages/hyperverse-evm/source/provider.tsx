import '@rainbow-me/rainbowkit/styles.css';
import {
	Chain,
	connectorsForWallets,
	getDefaultWallets,
	RainbowKitProvider,
	darkTheme,
	lightTheme,
} from '@rainbow-me/rainbowkit';
import { chain, ProviderProps as WagmiProviderProps, WagmiProvider } from 'wagmi';
import { useHyperverse } from '@decentology/hyperverse';
import { Evm } from './useEVM';

const INFURA_ID = process.env.INFURA_API_KEY! || 'fb9f66bab7574d70b281f62e19c27d49';

export type ProviderProps = {
	children: React.ReactNode;
} & WagmiProviderProps &
	Parameters<typeof RainbowKitProvider>[0];

export { darkTheme, lightTheme };

export const Provider = ({ children, ...props }: ProviderProps) => {
	//network testnet -> chain type
	const { chains, ...otherProps } = props;

	const { network } = useHyperverse();

	const newChain: Chain[] = [
		// { ...chain.mainnet, name: network.name!, rpcUrls: [network.networkUrl!] },
		{ ...chain.rinkeby, name: network.name!, rpcUrls: [network.networkUrl!] },
	];

	const wallets = getDefaultWallets({
		chains: newChain,
		infuraId: INFURA_ID,
		appName: 'Hyperverse',
		jsonRpcUrl: ({ chainId }) =>
			newChain.find((x) => x.id === chainId)?.rpcUrls?.[0] ?? chain.mainnet.rpcUrls[0],
	});

	const connectors = connectorsForWallets(wallets);

	return (
		<WagmiProvider autoConnect connectors={connectors} {...props}>
			<RainbowKitProvider chains={newChain} theme={darkTheme()} {...otherProps}>
				<Evm.Provider>{children}</Evm.Provider>
			</RainbowKitProvider>
		</WagmiProvider>
	);
};
