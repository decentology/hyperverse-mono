import { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import { HyperverseProvider } from './utils/Provider';
import React, { FC } from 'react';
import { useSafuu } from '../source/react';
import { useEffect } from 'react';
import { useState } from 'react';

export default {
	title: 'General/SetURI',
} as ComponentMeta<typeof Component>;

export const Demo: ComponentStoryFn<typeof Component> = (args) => (
	<HyperverseProvider>
		<Component {...args} />
	</HyperverseProvider>
);

Demo.args = {
	uri: 'https://www.safuu.com',
};

const Component = ({ uri }: { uri: string }) => {
	const { setURI, getURI } = useSafuu();
	const [localUri, setLocalUri] = useState<string>();
	useEffect(() => {
		getURI?.(1).then(setLocalUri);
	}, [getURI, setURI]);
	const changeUri = () => {
		setURI!(1, uri).then(() => setLocalUri(uri));
	};
	return (
		<div>
			<h1>Set Base URI</h1>
			<p>URI: {localUri}</p>
			<button onClick={changeUri}>Change URI</button>
		</div>
	);
};
