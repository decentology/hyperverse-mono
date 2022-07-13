import { useNFTGame } from '../source/react';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const TenantMint = ({
	...props
}: {
	to: string;
	tokenName: string;
	eyeId: number;
	mouthId: number;
	bodyId: number;
	level: number;
	standardChoices: number[];
	standardOptions: number[];
	specialChoices: number[];
	specialOptions: number[];
}) => {
	const { tenantMint } = useNFTGame();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					tenantMint!(props);
				}}
			>
				Tenant Mint
			</button>
		</>
	);
};
