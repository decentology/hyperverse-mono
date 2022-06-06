import { useNFT } from '../source';
import { useFlow } from '@decentology/hyperverse-flow';
import './style.css';

export const Setup = ({ ...props }) => {
	const { setup } = useNFT();
	const flowNFT = useFlow();

	return flowNFT.user.addr ? (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				setup();
			}}
		>
			Setup
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
