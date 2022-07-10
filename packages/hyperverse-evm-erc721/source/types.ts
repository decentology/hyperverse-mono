import { BigNumber } from "ethers";

export type CollectionInfo = {
	price: BigNumber;
	maxPerUser: BigNumber;
	maxSupply: BigNumber;
	lockCollection: boolean;
}
