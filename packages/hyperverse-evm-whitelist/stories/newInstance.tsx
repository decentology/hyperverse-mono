import { useWhitelist } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';
import { isAddress } from 'ethers/lib/utils';

export const NewInstance = ({
	...props
}: {
	tenant: string;
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
					// createInstance({ tenant: address, startTime: 3 });
				}}
			>
				New Instance
			</button>
		</>
	);
};
