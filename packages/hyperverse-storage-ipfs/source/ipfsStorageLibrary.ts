import { IHyperverseStorage, StorageProps } from '@decentology/hyperverse';
import { create } from 'ipfs-http-client';
import { concat as uint8ArrayConcat } from 'uint8arrays/concat';
import { toString as uint8ArrayToString } from 'uint8arrays/to-string';
import all from 'it-all';

export function IpfsStorageLibrary(
	{ clientUrl,resolveUrl }: StorageProps = { clientUrl: 'https://ipfs.infura.io:5001', resolveUrl:  'https://hyperverse.infura-ipfs.io/ipfs' }
): IHyperverseStorage {
	const client = create({ url: clientUrl });
	const { add, get, addAll, cat } = client;
	const getLink = (link: string) => `${resolveUrl}/${link}`;
	const uploadFile = async (file: File) => {
		const result = await add(file);
		return result.path;
	};
	const downloadFile = (link: string) => window.location.assign(getLink(link));
	const openFile = async (link: string) => {
		const result = uint8ArrayToString(uint8ArrayConcat(await all(await cat(link))));
		return result;
	};
	return {
		clientUrl,
		client,
		getLink,
		uploadFile,
		downloadFile,
		openFile,
	};
}
