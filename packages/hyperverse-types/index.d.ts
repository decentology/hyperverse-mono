
export interface IHyperverseStorage {
	[key: string]: unknown;
	uploadFile: (file: File) => Promise<string>;
	downloadFile: (link: string) => Promise<void> | void;
	openFile: (link: string) => Promise<string>;
	getLink: (link: string) => string;
	client: unknown;
	clientUrl: string | undefined;
}

export type StorageProps = {
	clientUrl: string | undefined;
	resolveUrl?: string
	auth?: {
		projectId: string;
		projectSecret: string;
	}
};
