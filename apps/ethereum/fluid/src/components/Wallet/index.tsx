import { FC } from 'react';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { Address } from '@web3-ui/components';

import ConnectWallet from '../ConnectWallet';

interface WalletProps {
	ens: string | undefined;
	userAddress: string | null | undefined;
}

export const Wallet: FC<WalletProps> = ({ ens, userAddress }) => {
	const { address, disconnect, connect, error } = useEthereum();

	return (
		<>
			{ens || userAddress ? (
				<div className="flex items-center gap-4">
					<Address value={address} shortened copiable />
					<ConnectWallet />
				</div>
			) : (
				<ConnectWallet />
			)}
		</>
	);
};
