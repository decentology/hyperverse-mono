import { createContainer, useContainer } from '@decentology/unstated-next';
import {  useHyperverse } from '@decentology/hyperverse';
import '@rainbow-me/rainbowkit/styles.css';

import { useAccount, useSigner, useEnsName, useProvider } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react'


function EvmState() {
	const [allow, setAllow] = useState(false);

	const { network } = useHyperverse();

	const readOnlyProvider = useProvider();

	const {data: account, error: accountErr, isLoading} = useAccount();

	const address = account?.address;

	const {data: ens} = useEnsName(address);

	//check this signer network
	let {data: signer} = useSigner();


	useEffect(()=> {
		signer?.provider.getNetwork().then((n: { chainId: number | undefined; }) => {
				n.chainId === network.chainId ? setAllow(true) : setAllow(false);
				
		})
	}, [signer?.provider])

	useEffect(() => { 
		if (account == null) {
			setAllow(false);
		}
	}, [account]);

	return { Connect: ConnectButton, readOnlyProvider, connectedProvider: null, signer: allow ? signer : null , account: address, address:address, ens: ens, error: accountErr, isLoading: isLoading };
}

export const Evm = createContainer(EvmState);
export const Provider = Evm.Provider;
export function useEvm() {
	return useContainer(Evm);
}
