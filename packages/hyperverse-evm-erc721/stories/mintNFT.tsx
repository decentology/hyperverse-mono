import { useERC721 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const MintNFTForm = ({ ...props }) => {
	const { mint } = useERC721();
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
						mint(address);
					} else {
						console.error();
					}
				}}
			>
				Mint NFT
			</button>
		</>
	);
};
