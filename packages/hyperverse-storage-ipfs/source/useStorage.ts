import { useMemo, useState } from 'react';
import { create } from 'ipfs-http-client';
import { createContainer } from '@decentology/unstated-next';
import { concat as uint8ArrayConcat } from 'uint8arrays/concat';
import { toString as uint8ArrayToString } from 'uint8arrays/to-string';
import { StorageProps } from '@decentology/hyperverse';
import all from 'it-all';
import { IpfsStorageLibrary } from './ipfsStorageLibrary';

function StorageState(
	{ clientUrl }: StorageProps = { clientUrl: 'https://ipfs.infura.io:5001' }
) {
	const lib = useMemo(IpfsStorageLibrary, [clientUrl]);
	return lib
}

const Storage = createContainer(StorageState);
export const Provider = Storage.Provider;

export function useStorage() {
	return Storage.useContainer();
}
