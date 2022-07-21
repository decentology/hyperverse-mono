import { createContainer, useContainer } from '@decentology/unstated-next';
import { useHyperverse } from '@decentology/hyperverse/react';
import { useAccount, useSigner, useEnsName, useProvider } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';

function EvmState() {
	const [allow, setAllow] = useState(false);
	const { network } = useHyperverse();
	const readOnlyProvider = useProvider();
	const { address, status: accountErr, isConnecting, isReconnecting } = useAccount();
	const isLoading = isConnecting || isReconnecting;

	// @ts-ignore - Type requires too many extra params that aren't actually required
	const { data: ens } = useEnsName({address: address});
	let { data: signer } = useSigner();

	useEffect(() => {
		signer?.provider?.getNetwork().then((n: { chainId: number | undefined }) => {
			n.chainId === network.chainId ? setAllow(true) : setAllow(false);
		});
	}, [signer?.provider]);

	useEffect(() => {
		if (address == null) {
			setAllow(false);
		}
	}, [address]);

	return {
		Connect: ConnectButton,
		readOnlyProvider,
		connectedProvider: null,
		signer: allow ? signer : null,
		account: address,
		address: address,
		ens: ens,
		error: accountErr,
		isLoading: isLoading,
	};
}

export const Evm = createContainer(EvmState);
export const Provider = Evm.Provider;
export function useEvm() {
	return useContainer(Evm);
}
