export type MetaData = {
	name: string;
	description: string;
	image: string;
};

export type Storage = {
	uploadFile: (image: File) => Promise<{skylink: string}>;
}
