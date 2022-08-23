import { IHyperverseStorage, StorageProps } from '@decentology/hyperverse-types';
import { create } from 'ipfs-http-client';
import { concat as uint8ArrayConcat } from 'uint8arrays/concat';
import { toString as uint8ArrayToString } from 'uint8arrays/to-string';
import all from 'it-all';

export function IpfsStorageLibrary(
	{ clientUrl, resolveUrl }: StorageProps = { clientUrl: 'https://ipfs.infura.io:5001', resolveUrl: 'https://hyperverse.infura-ipfs.io/ipfs' }
): IHyperverseStorage {
	const client = create({
		url: clientUrl,
		headers: {
			'Authorization': 'Basic ' + btoa('28n9q4TTsOYcr5S18JezWwDKByj:94a350dcac2a0c626d7e9578f56ba5a7')
		}
	});
	const { add, get, addAll, cat } = client;
	const getLink = (link: string) => `${resolveUrl}/${link}`;
	const uploadFile = async (file: File) => {
		const result = await add({name: file.name, content: file});
		return result.cid.toString();
		// return getLink(result.path);
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
