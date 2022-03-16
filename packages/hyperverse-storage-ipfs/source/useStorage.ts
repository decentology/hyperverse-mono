import { useState } from 'react';
import { create, IPFSHTTPClient, } from 'ipfs-http-client';
import { createContainer } from '@decentology/unstated-next';

type StorageProps = {
	clientUrl: string;
};

function StorageState({ clientUrl }: StorageProps = { clientUrl: 'https://ipfs.unfura.io:5001/api/v0' }) {
	const [client] = useState<IPFSHTTPClient>(create({url: clientUrl}));
	const {add, get, addAll, } = client;
	const getLink = (siaLink: string) => `${clientUrl}/${siaLink.replace('sia:', '')}`;
	return {
		uploadFile: add,
		uploadDirectory: addAll,
		downloadFile: downloadFile.bind(client),
		openFile: openFile.bind(client),
		getLink: get,
		client,
		clientUrl,
	};
}

const Storage = createContainer(StorageState);
export const Provider = Storage.Provider;

export function useStorage() {
	return Storage.useContainer();
}
