import '@rainbow-me/rainbowkit/styles.css';

import { Chain, connectorsForWallets, getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { providers } from 'ethers';
import { useCallback, useEffect, useRef, useState } from 'react';
import { chain, ProviderProps as WagmiProviderProps, WagmiProvider } from 'wagmi';

const INFURA_ID = process.env.INFURA_API_KEY! || 'fb9f66bab7574d70b281f62e19c27d49';

const provider = ({ chainId }: {chainId: string}) => new providers.InfuraProvider(chainId, INFURA_ID);

const chains: Chain[] = [
	{ ...chain.mainnet, name: 'Ethereum' },
	{ ...chain.polygonMainnet, name: 'Polygon' },
	{ ...chain.hardhat, name: 'Hardhat' },
	{ ...chain.optimism, name: 'Optimism' },
	{ ...chain.arbitrumOne, name: 'Arbitrum' },
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

export const Provider = ({ children, ...props }:ProviderProps) => {
	return (
		<WagmiProvider autoConnect connectors={connectors} {...props}>
			{/* @ts-ignore I KNOW  */}
			<RainbowKitProvider chains={chains} theme={darkTheme()} {...props}>{children}</RainbowKitProvider>
		</WagmiProvider>
	);
};
