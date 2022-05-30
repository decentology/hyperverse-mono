import { useERC721 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const MintNFT = ({ ...props }: {to: string}) => {
	const { mint } = useERC721();
	const { address, connect } = useEvm();

	return address ? (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				mint(props.to);
			}}
		>
			Mint NFT
		</button>
	) : (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				connect();
			}}
		>
			Connect
		</button>
	);
};