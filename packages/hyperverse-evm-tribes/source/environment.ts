import { networks, useHyperverse, blockchains, } from '@decentology/hyperverse';
import Blockchain, { isEvm } from '@decentology/hyperverse/source/constants/blockchains';

const environment = {
	[blockchains.Ethereum]: {
		[networks.Mainnet]: {
			contractAddress: null,
		},
		[networks.Testnet]: {
			contractAddress: '0xf8CEc073d08e42cdDC1bF1fd8d44ce3252ab7352',
			tenantAddress: '0xD847C7408c48b6b6720CCa75eB30a93acbF5163D'
		},
	},
	[blockchains.Metis]: {
		[networks.Mainnet]: {
			contractAddress: null,
		},
		[networks.Testnet]: {
			contractAddress: 'x07F3062D51C9A6CA568C8135656054FA88D5b646',
			tenantAdress: '0x8f8B8BE836fbe857c65E892dBb261F249f9b0adb'
		},
	},
	[blockchains.Avalanche]: {
		[networks.Mainnet]: {
			contractAddress: null,
		},
		[networks.Testnet]: {
			contractAddress: ''
		}
	}
}

function useEnvironment() {
	const { blockchain, network } = useHyperverse();
	if (blockchain == null) {
		throw new Error('Blockchain is not set');
	}
	if (!isEvm(blockchain?.name)) {
		throw new Error("Blockchain is not EVM compatible")
	}
	return environment[blockchain.name][network];

}

export { environment, useEnvironment };
