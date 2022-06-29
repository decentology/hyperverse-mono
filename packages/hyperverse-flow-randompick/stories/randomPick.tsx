import { useRandomPick } from '../source';
import { useState, useEffect } from 'react';
import './style.css';

export const RandomPick = ({ ...props }: {values: string[]}) => {
	const randomPick = useRandomPick();
	const [data, setData] = useState([]);

	useEffect(() => {
		if (randomPick.getRandomPick) {
			randomPick.getRandomPick(props.values).then(setData);
		}
	}, [randomPick.getRandomPick]);

	return (
		<div className="body">
			Random Pick: <b>{data}</b>
		</div>
	);
};