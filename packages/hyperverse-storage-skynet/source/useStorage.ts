import { useState } from 'react';
import { SkynetClient } from 'skynet-js';
import { createContainer } from '@decentology/unstated-next';
import { SkynetStorageLibrary } from './lib/SkynetStorageLibrary';
import { StorageProps } from '@decentology/hyperverse';


function StorageState({ clientUrl }: StorageProps = { clientUrl: 'https://siasky.net' }) {
	const lib = SkynetStorageLibrary({ clientUrl });
	return lib;
}

const Storage = createContainer(StorageState);
export const Provider = Storage.Provider;

export function useStorage() {
	return Storage.useContainer();
}
