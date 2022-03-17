import { useState } from 'react';
import { SkynetClient } from 'skynet-js';
import { createContainer } from '@decentology/unstated-next';
import { IHyperverseStorage } from '@decentology/hyperverse/source';
type StorageProps = {
	clientUrl: string;
};

function StorageState(
	{ clientUrl }: StorageProps = { clientUrl: 'https://siasky.net' }
): IHyperverseStorage {
	const [client] = useState<SkynetClient>(new SkynetClient(clientUrl));
	const { uploadFile, uploadDirectory, downloadFile, openFile } = client;
	const getLink = (siaLink: string) => `${clientUrl}/${siaLink.replace('sia:', '')}`;
	return {
		uploadFile: async file => {
			const result = await uploadFile.bind(client)(file);
			return result.skylink;
		},
		// uploadDirectory: async (files: File[]) => {
		// 	const result = await uploadDirectory.bind(client)(files);
		// 	return [result.skylink];
		// },
		downloadFile: async link => {
			await downloadFile.bind(client)(link);
		},
		openFile: openFile.bind(client),
		getLink,
		client,
		clientUrl
	};
}

const Storage = createContainer(StorageState);
export const Provider = Storage.Provider;

export function useStorage() {
	return Storage.useContainer();
}
