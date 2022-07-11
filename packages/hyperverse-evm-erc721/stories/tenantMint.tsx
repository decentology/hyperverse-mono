import { useERC721 } from '../source/react';
import { useEvm } from '@decentology/hyperverse-evm/react';
import { useCallback, useRef } from 'react';
import './style.css';

export const TenantMint = ({ ...props }: { to: string; image: File }) => {
	const { tenantMint, error } = useERC721();
	const { address, Connect } = useEvm();
	const imageRef = useRef(null);
	var require: any

	const uploadFile = useCallback(async () => {
		const result = await tenantMint?.({
			to: props.to,
			image: props.image,
		});
		console.log('Result', result);
	}, [tenantMint]);

	return error != null ? (
		<div>Error</div>
	) : (
		<>
			<img
				id="hyperverse-logo"
				ref={imageRef}
				style={{ display: 'none' }}
				// src={require('./assets/hyperverse-logo.png')}
			/>
			{address ? (
				<button
					type="button"
					className={['storybook-button', `storybook-button--large`].join(' ')}
					style={{ color: 'blue' }}
					onClick={uploadFile}
				>
					Tenant Mint
				</button>
			) : (
				<Connect />
			)}
		</>
	);
};
