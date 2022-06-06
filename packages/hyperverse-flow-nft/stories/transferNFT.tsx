import { useNFT } from '../source';
import { useFlow } from '@decentology/hyperverse-flow';
import './style.css';


export const TransferNFT = ({ ...props }) => {
	const { transferNFT } = useNFT();
	const flowNFT = useFlow();

	return flowNFT.user.addr ? (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				transferNFT('', '', '');
			}}
		>
			Transfer NFT
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
