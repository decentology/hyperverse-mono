import * as PropTypes from 'prop-types';
import './button.css';
import { useTribes } from '../source';
import { useEffect, useState } from 'react';
import { MetaDataFormatted } from '../source/types';
import { Styles } from './formStyles';

export const GetAllTribes = ({ tribeOne, tribeTwo, ...props }) => {
	const tribes = useTribes();
	const [data, setData] = useState<MetaDataFormatted[] | null>(null);
	// const [data, setData] = useState(tribeOne);

	useEffect(() => {
		if (tribes.getAllTribes) {
			tribes.getAllTribes().then(setData);
			console.log(data);
		}
	}, [tribes.getAllTribes]);

	return (
		<Styles>
			<form>
				<h1> TRIBES </h1>
				<div id="block_container">
					<div id="bloc1">
						<label>
							Knight Tribe Id: <b>{tribeOne.id}</b>
						</label>
						<img src={tribeOne.imageUrl} />
					</div>
					<div id="bloc2">
						<label>
							Mage Tribe Id: <b>{tribeTwo.id}</b>
						</label>
						<img src={tribeTwo.imageUrl} />
					</div>
				</div>
			</form>
		</Styles>
	);
};

GetAllTribes.propTypes = {};

GetAllTribes.defaultProps = {};
