import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const NewInstance = ({ ...props }) => {
	const { createInstance } = useERC777();
	const { address, Connect } = useEvm();

	return address ? (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				createInstance?.({
					account: address,
					tokenName: 'TEST',
					tokenSymbol: 'TST',
					operator: ['0x976EA74026E726554dB657fA54763abd0C3a0aa9'],
					initialSupply: 50000,
				});
			}}
		>
			New Instance
		</button>
	) : (
		<Connect />
	);
};
