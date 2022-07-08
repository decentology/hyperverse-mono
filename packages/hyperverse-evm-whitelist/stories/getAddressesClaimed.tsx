import { useWhitelist } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const GetAddressesClaimed = ({ ...props }) => {
	const { getAddressesClaimed } = useWhitelist();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					getAddressesClaimed?.();
				}}
			>
				Get Addresses Claimed
			</button>
		</>
	);
};
