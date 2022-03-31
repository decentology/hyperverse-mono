import { ethers } from "ethers"

export const getProvider = (networkUrl: string) => {
	return new ethers.providers.JsonRpcProvider(networkUrl)
}
