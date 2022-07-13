import { useNFTGame } from '../source/react';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const ModifyDynamicAttributes = ({
	...props
}: {
	tokenId: number;
	attributes: number[];
}) => {
	const { modifyDynamicAttributes } = useNFTGame();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					modifyDynamicAttributes!(props.tokenId, props.attributes);
				}}
			>
				Modify Dynamic Attributes
			</button>
		</>
	);
};
