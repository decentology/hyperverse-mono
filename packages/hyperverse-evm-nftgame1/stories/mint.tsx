import { useNFTGame1 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const Mint = ({ ...props }: { to: string }) => {
	const { mint } = useNFTGame1();
	const { address, Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					mint(address);
				}}
			>
				Mint
			</button>
		</>
	);
};
