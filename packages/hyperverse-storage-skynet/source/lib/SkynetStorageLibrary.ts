import { SkynetClient } from "skynet-js";
import { IHyperverseStorage, StorageProps } from '@decentology/hyperverse'

export function SkynetStorageLibrary({ clientUrl }: StorageProps): IHyperverseStorage {
	const client = new SkynetClient(clientUrl);
	const getLink = (link: string) => {
		return `${client.portalUrl}/${link.replace('sia:', '')}`;
	}

	const uploadFile = async(file: File) => {
		const result = await client.uploadFile(file);
		return result.skylink;
	}

	const downloadFile = async(link: string) => {
		window.location.assign(getLink(link));
	}

	const openFile = async(link: string) => {
		const result = await client.openFile(link);
		return result;
	}

	return {
		client,
		clientUrl,
		getLink,
		uploadFile,
		downloadFile,
		openFile
	}
}
