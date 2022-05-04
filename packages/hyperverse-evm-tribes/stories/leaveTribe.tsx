import React from 'react';
import PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';
import { useState, useEffect } from 'react';
import './button.css';
import './header.css';

export const LeaveTribe = ({ ...props }) => {
	const tribes = useTribes();
	const { address } = useEvm();
	const [user, setUser] = useState(null);
	const [data, setData] = useState(null);

	const leaveKnight = () => {
		tribes.leaveTribe().then(setData);
		console.log('You have left the tribe Knight.');
	};

	// useEffect(() => {
	// 	return () => {
	// 		tribes.leaveTribe().then(setData);
	// 	};
	// }, []);

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
				<div>
					{address ? (
						<>
							<span className="greeting">
								Welcome, <b>{address}</b>!
							</span>
							<button
								type="button"
								className={['storybook-button', `storybook-button--large`].join(
									' '
								)}
								style={{ color: 'blue' }}
								onClick={() => {
									leaveKnight;
								}}
							/>
							Leave Tribe
						</>
					) : (
						<>
							<span className="welcome">You have not joined a tribe.</span>
						</>
					)}
				</div>
			</div>
		</header>
	);
};

LeaveTribe.propTypes = {};

LeaveTribe.defaultProps = {};
