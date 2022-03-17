import { useState } from 'react';
import { create, IPFSHTTPClient } from 'ipfs-http-client';
import { createContainer } from '@decentology/unstated-next';
import { concat as uint8ArrayConcat } from 'uint8arrays/concat';
import { toString as uint8ArrayToString } from 'uint8arrays/to-string';
import { IHyperverseStorage } from '@decentology/hyperverse';
import all from 'it-all';
type StorageProps = {
	clientUrl: string;
};

function StorageState(
	{ clientUrl }: StorageProps = { clientUrl: 'https://ipfs.infura.io:5001' }
): IHyperverseStorage {
	const [client] = useState<IPFSHTTPClient>(create({ url: clientUrl }));
	const { add, get, addAll, cat } = client;
	const getLink = (link: string) => `https://cloudflare-ipfs.com/ipfs/${link}`;
	return {
		uploadFile: async (file: File) => {
			const result = await add(file);
			return result.path;
		},
		// uploadDirectory: async (files: File[]) => {
		// 	const result = await addAll(files);
		// 	let paths = [];
		// 	for await (const x of result) {
		// 		paths.push(x.path);
		// 	}
		// 	return paths;
		// },
		downloadFile: (link: string) => window.location.assign(getLink(link)),
		openFile: async (link) => {
			const result = uint8ArrayToString(uint8ArrayConcat(await all(await cat(link))));
			return result;
		},
		getLink,
		client,
		clientUrl,
	};
}

const Storage = createContainer(StorageState);
export const Provider = Storage.Provider;

export function useStorage() {
	return Storage.useContainer();
}
