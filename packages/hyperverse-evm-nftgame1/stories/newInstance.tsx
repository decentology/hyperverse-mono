import { useNFTGame1 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const NewInstance = ({ ...props }) => {
	const { createInstance } = useNFTGame1();
	const { address, Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					createInstance({ account: address, name: 'TEST', symbol:'TST', instanceBaseURI: 'https://example.com/' });
				}}
			>
				New Instance
			</button>
		</>
	);
};
