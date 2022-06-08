import { useERC777 } from '../source';
import { useEffect, useState } from 'react';

export const IsOperatorFor = ({ ...props }: { operator: string; tokenHolder: string }) => {
	const erc777 = useERC777();
	const [data, setData] = useState();

	useEffect(() => {
		if (erc777.checkOperator) {
			erc777.checkOperator(props).then(setData);
		}
	}, [erc777.checkOperator]);

	const operatorExists = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>Error.</p>;
	};

	return (
		<div className="body">
			{' '}
			Operator for: <b>{props.tokenHolder}</b> {operatorExists()}
		</div>
	);
};
