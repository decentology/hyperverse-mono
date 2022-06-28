import { useWhitelist } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const ClaimWhitelist = ({ ...props }: { account: string }) => {
	const { claimWhitelist } = useWhitelist();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					claimWhitelist?.(props.account);
				}}
			>
				Claim Whitelist
			</button>
		</>
	);
};
