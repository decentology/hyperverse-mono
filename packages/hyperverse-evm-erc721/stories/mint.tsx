import { useERC721 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/react';
import './style.css';

export const Mint = ({ ...props }: { to: string; amount: number }) => {
	const { mint } = useERC721();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					mint!(props.to, props.amount);
				}}
			>
				Mint
			</button>
		</>
	);
};
