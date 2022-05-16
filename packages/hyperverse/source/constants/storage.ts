enum Storage {
	Skynet = 'skynet',
	Ipfs = 'ipfs',
}

export default Storage;
export const StorageList: string[] = Object.values(Storage).filter((v) => typeof v === 'string');

