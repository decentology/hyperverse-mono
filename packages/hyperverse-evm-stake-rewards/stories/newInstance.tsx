import { useStakeRewards } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const NewInstance = ({ ...props }) => {
	const { createInstance } = useStakeRewards();
	const { address, Connect } = useEvm();
	console.log('address', address)

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					createInstance({ account: address, tokenName: 'TEST', tokenSymbol: 'TST', initialSupply: 20000 });
				}}
			>
				New Instance
			</button>
		</>
	);
};
