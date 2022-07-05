import { useWhitelist } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const NewInstance = ({
	...props
}: {
	account: string;
	startTime: number;
	endTime: number;
	units: number;
	ERC721: string;
	ERC20: string;
	merkleRoot: any;
}) => {
	const { createInstance } = useWhitelist();
	const { address, Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					console.log('in the click');
					createInstance?.({
						account: address!
					});
				}}
			>
				New Instance
			</button>
		</>
	);
};
