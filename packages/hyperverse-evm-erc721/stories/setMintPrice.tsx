import { useERC721 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const SetMintPrice = ({ ...props }: { price: number }) => {
	const { setMintPrice } = useERC721();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					setMintPrice?.(props.price);
				}}
			>
				Set Mint Price
			</button>
		</>
	);
};
