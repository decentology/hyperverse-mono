export type MetaData = {
	name: string;
	description: string;
	image: string;
};

export type MetaDataFormatted = {
	id: number;
	imageUrl: string
} & MetaData;

export type Storage = {
	uploadFile: (image: File) => Promise<{skylink: string}>;
	clientUrl: string
}
