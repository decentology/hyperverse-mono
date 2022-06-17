import { useERC721 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const SetPublicSale = ({ ...props }: { publicSale: boolean }) => {
	const { setPublicSale } = useERC721();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					setPublicSale?.(props.publicSale);
				}}
			>
				Set Public Sale
			</button>
		</>
	);
};
