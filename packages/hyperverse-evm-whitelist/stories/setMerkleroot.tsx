import { useWhitelist } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const SetMerkleRoot = ({ ...props }: { root: string }) => {
	const { setMerkleRoot } = useWhitelist();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					setMerkleRoot(props.root);
				}}
			>
				Set Merkle Root
			</button>
		</>
	);
};
