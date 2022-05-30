import './style.css';
import { useERC721 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';

export const Transfer = ({ ...props }: { tokenId: number; to: string }) => {
	const { transfer } = useERC721();
	const { address, Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					if (transfer && address) {
						// mutate({ from: address, to: address, tokenId: 123 });
						transfer({
							from: address,
							to: props.to,
							tokenId: props.tokenId,
						});
					} else {
						alert('Please connect your wallet');
					}
				}}
			>
				Transfer
			</button>
		</>
	);
};
