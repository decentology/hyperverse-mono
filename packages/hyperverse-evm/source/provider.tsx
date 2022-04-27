import '@rainbow-me/rainbowkit/styles.css';

import { Chain, connectorsForWallets, getDefaultWallets, RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
import { providers } from 'ethers';
import { chain, ProviderProps as WagmiProviderProps, WagmiProvider } from 'wagmi';
import { useHyperverse } from '@decentology/hyperverse';

const INFURA_ID = process.env.INFURA_API_KEY! || 'fb9f66bab7574d70b281f62e19c27d49';

const provider = ({ chainId }: {chainId: string}) => new providers.InfuraProvider(chainId, INFURA_ID);

//this should be structured and come fro the hyperverse ethereum
const chains: Chain[] = [
	{ ...chain.rinkeby, name: 'rinkeby', id: 4, rpcUrls: [`https://rinkeby.infura.io/v3/${INFURA_ID}`] },

];

const wallets = getDefaultWallets({
	chains,
	infuraId: INFURA_ID,
	appName: 'My RainbowKit App',
	jsonRpcUrl: ({ chainId }) =>
		chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ?? chain.mainnet.rpcUrls[0],
});

const connectors = connectorsForWallets(wallets);


export type ProviderProps = {
	children: React.ReactNode;
} &WagmiProviderProps & Parameters<typeof RainbowKitProvider>[0];

export {darkTheme, lightTheme} ;

export const Provider = ({ children, ...props }:ProviderProps) => {
	//network testnet -> chain type 
	// const {chains, ...otherProps} = props;
	
	const {network} = useHyperverse()

	const newChain : Chain[] = [
		{...chain.rinkeby, name: network.name, rpcUrls: [network.networkUrl]}
	]
	

	return (
		<WagmiProvider autoConnect connectors={connectors} {...props}>
			<RainbowKitProvider chains={newChain} theme={darkTheme()} {...props}>{children}</RainbowKitProvider>
		</WagmiProvider>
	);
};
