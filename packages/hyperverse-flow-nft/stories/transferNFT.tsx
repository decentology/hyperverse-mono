import { useNFT } from '../source';
import { useFlow } from '@decentology/hyperverse-flow';
import './style.css';

export const TransferNFT = ({ ...props }) => {
	const { transferNFT } = useNFT();
	const flowNFT = useFlow();

	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				transferNFT('0x4ddbaf7fe601ac46', '0xd2a8d169a907bf1f', 1);
			}}
		>
			Transfer NFT
		</button>
	);
};
