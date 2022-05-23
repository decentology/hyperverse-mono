import { useMemo } from 'react';
import { createContainer } from '@decentology/unstated-next';
import { StorageProps } from '@decentology/hyperverse-types';
import { IpfsStorageLibrary } from './ipfsStorageLibrary';

function StorageState(
	{ clientUrl }: StorageProps = { clientUrl: 'https://ipfs.infura.io:5001' }
) {
	const lib = IpfsStorageLibrary({ clientUrl });
	return lib
}

const Storage = createContainer(StorageState);
export const Provider = Storage.Provider;

export function useStorage() {
	return Storage.useContainer();
}
