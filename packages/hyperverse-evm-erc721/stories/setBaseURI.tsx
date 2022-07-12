import { useERC721 } from '../source/react';
import { useEvm } from '@decentology/hyperverse-evm/react';
import { ReactElement } from 'react';
import './style.css';

export const SetBaseURI = ({ baseURI }: {baseURI: string}): ReactElement => {
	const { setBaseURI } = useERC721();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					setBaseURI!(baseURI);
				}}
			>
				Set Base URI
			</button>
		</>
	);
};
