import { NetworkConfig } from "@decentology/hyperverse"
import { ethers } from "ethers"

export const getProvider = (network: NetworkConfig) => {
	return new ethers.providers.JsonRpcProvider(network.networkUrl, {chainId: network.chainId!, name: network.name!})
}
