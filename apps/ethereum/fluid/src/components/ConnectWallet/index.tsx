import { FC } from 'react';
import clsx from 'clsx';
import { useEthereum } from '@decentology/hyperverse-ethereum';

interface ConnectWalletProps {
	className?: string;
}

const ConnectWallet: FC<ConnectWalletProps> = ({ className }) => {
	const { address, disconnect, connect, error } = useEthereum();

	return (
		<button
			type="button"
			className={clsx(
				className,
				'py-2 px-4 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-red-700 text-white font-bold'
			)}
			onClick={address ? disconnect : connect}
		>
			{address ? 'Disconnect' : 'Connect wallet'}
		</button>
	);
};

ConnectWallet.displayName = 'ConnectWallet';

export default ConnectWallet;
