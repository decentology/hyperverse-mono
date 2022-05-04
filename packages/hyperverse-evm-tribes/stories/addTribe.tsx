import PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';
import { useEffect, useState } from 'react';
import './header.css';
import { UploadFile } from './filePicker';

export const AddTribe = ({ ...props }) => {
	const tribes = useTribes();
	const { address } = useEvm();
	const [user, setUser] = useState(null);
	const [data, setData] = useState(null);

	return (
		<header>
			<div className="wrapper">
				<div>
					<svg
						width="32"
						height="32"
						viewBox="0 0 32 32"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g fill="none" fillRule="evenodd">
							<path
								d="M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z"
								fill="#FFF"
							/>
							<path
								d="M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z"
								fill="#555AB9"
							/>
							<path
								d="M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z"
								fill="#91BAF8"
							/>
						</g>
					</svg>
					<h1>Tribes</h1>
				</div>
				<form>
					<div>
						<>
							<button
								type="button"
								className={['storybook-button', `storybook-button--large`].join(
									' '
								)}
								style={{ color: 'blue' }}
								// Want to pass the file we uploaded into tribes.addTribes()
								// tribes.addTribe(data);
								// mutate({ metadata: '', image: File });
							/>
							Add Tribe
						</>
					</div>
				</form>
			</div>
		</header>
	);
};

AddTribe.propTypes = {};

AddTribe.defaultProps = {};
