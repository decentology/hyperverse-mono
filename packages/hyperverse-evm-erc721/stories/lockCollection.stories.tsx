import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/setMintPermissions.mdx';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import { useERC721 } from '../source/react';
import { useEvm } from '@decentology/hyperverse-evm/react';

export default {
	title: 'Components/lockCollection',
	component: LockCollection,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof LockCollection>;

export const Demo: ComponentStoryFn<typeof LockCollection> = () => (
	<HyperverseProvider>
		<LockCollection />
	</HyperverseProvider>
);

function LockCollection() {
	const { lockCollection } = useERC721();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					lockCollection?.();
				}}
			>
				Lock Collection
			</button>
		</>
	);
}
