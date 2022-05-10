import { SkynetClient } from "skynet-js";

export class SkynetStorageLibrary extends SkynetClient {
	client: SkynetClient;
	clientUrl: string | undefined;

	constructor({ clientUrl }: StorageProps = { clientUrl: 'https://siasky.net' }) {
		super();
		this.clientUrl = clientUrl;
		this.client = new SkynetClient(clientUrl);
		Object.assign(this, this.client)
	}
	getLink(siaLink: string) { 
		return `${this.client.portalUrl}/${siaLink.replace('sia:', '')}`;
	}
}
