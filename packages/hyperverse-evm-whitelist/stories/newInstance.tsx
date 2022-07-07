import { useWhitelist } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const NewInstance = ({}: {
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
					createInstance?.({
						account: address!,
						startTime: 20,
						endTime: 40,
						units: 10,
						ERC721: '0x0000000000000000000000000000000000000000',
						ERC20: '0x0000000000000000000000000000000000000000',
						merkleRoot: '',
					});
				}}
			>
				New Instance
			</button>
		</>
	);
};
