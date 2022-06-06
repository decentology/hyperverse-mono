import { useNFT } from '../source';
import { useFlow } from '@decentology/hyperverse-flow';
import './style.css';

export const MintNFT = ({
	...props
}: {
	recipient: string;
	name: string;
	description: string;
	thumbnail: string;
	metadata: any;
}) => {
	const { mintNFT } = useNFT();
	const flowNFT = useFlow();

	return flowNFT.user.addr ? (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				mintNFT('', '', '', '', '');
			}}
		>
			Mint
		</button>
	) : (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				// connect();
			}}
		>
			Connect Wallet
		</button>
	);
};
