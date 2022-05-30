import './style.css';
import { useERC721 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';

export const NewInstance = ({ ...props }) => {
	const { createInstance } = useERC721();
	const { address, Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					if (address) {
						createInstance({
							account: address,
						});
					} else {
						alert('Please connect your wallet');
					}
				}}
			>
				{address ? 'New Instance' : 'Connect'}
			</button>
		</>
	);
};
