import { FC } from 'react';
import { Evm } from '@decentology/hyperverse-evm';
import { Metis } from './useMetis';
const Provider: FC<any> = ({ children }) => {
	return (
		<Evm.Provider
			initialState={{
				networks: {
					mainnet: {
						name: 'andromeda',
						networkUrl: 'https://andromeda.metis.io/?owner=1088',
						chainId: 1088,
						explorerUrl: 'https://andromeda-explorer.metis.io/'
					},
					testnet: {
						name: 'stardust',
						chainId: 588,
						networkUrl: 'https://stardust.metis.io/?owner=588',
						explorerUrl: 'https://stardust.metis.io/',
					},
				},
			}}
		>
			<Metis.Provider>{children}</Metis.Provider>
		</Evm.Provider>
	);
};

export default Provider;
