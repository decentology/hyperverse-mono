import { useNFT } from '../source';
import { useFlow } from '@decentology/hyperverse-flow';
import './style.css';

export const MintNFT = ({
	...props
}: {
	recipient: string;
	name: string;
	description: string;
	thumbnail: string;
	metadata: any;
}) => {
	const { mintNFT } = useNFT();
	const flowNFT = useFlow();

	return  (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				mintNFT('0xd2a8d169a907bf1f','firstNFT','The very first NFT.','','');
			}}
		>
			Mint
		</button>
	)
};
