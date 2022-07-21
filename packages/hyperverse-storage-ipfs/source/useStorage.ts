import { useMemo } from 'react';
import { createContainer } from '@decentology/unstated-next';
import { StorageProps } from '@decentology/hyperverse-types';
import { IpfsStorageLibrary } from './ipfsStorageLibrary';

function StorageState(
	{ clientUrl, resolveUrl }: StorageProps = { clientUrl: 'https://ipfs.infura.io:5001', resolveUrl: 'https://hyperverse.infura-ipfs.io/ipfs' }
) {
	const lib = IpfsStorageLibrary({ clientUrl, resolveUrl });
	return lib
}

const Storage = createContainer(StorageState);
export const Provider = Storage.Provider;

export function useStorage() {
	return Storage.useContainer();
}
