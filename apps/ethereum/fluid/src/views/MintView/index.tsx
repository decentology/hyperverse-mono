import { FC } from 'react';

import { ContractInfo } from '../ContractInfo';
import CreateInstance from './CreateInstance';
import HowThisWorks from './HowThisWorks';
import MintToken from './MintToken';

const MintView: FC = () => {
	return (
		<>
			<HowThisWorks />
			<CreateInstance />
			<MintToken />
			<ContractInfo />
		</>
	);
};

export default MintView;
