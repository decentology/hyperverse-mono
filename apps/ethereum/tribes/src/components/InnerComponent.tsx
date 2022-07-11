import React from 'react';
import { useTribes } from '@decentology/hyperverse-evm-tribes/react';

const InnerComponent: React.FunctionComponent<any> = ({ children }) => {
	const { useTribeEvents } = useTribes();
	useTribeEvents('JoinedTribe', (x: any) => {});

	return <div>{children}</div>;
};

export default InnerComponent;
