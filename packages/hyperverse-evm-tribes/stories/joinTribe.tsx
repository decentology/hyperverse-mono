import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';
import './header.css';

export const JoinTribe = ({ ...props }) => {
	const tribes = useTribes();
	const { address } = useEvm();
	const [user, setUser] = useState(null);
	const [data, setData] = useState(null);

	const joinKnight = () => {
		useEffect(() => {
			tribes.joinTribe(1).then(setData)
			console.log("You have joined the tribe Knight.")
		}, [])
	}

	const joinMage = () => {
		useEffect(() => {
			tribes.joinTribe(1).then(setData)
			console.log("You have joined the tribe Mage.")
		}, [])
	}

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
							<span className="tribes">
								Welcome, <b>{address}</b>!
							</span>
							<button
								type="button"
								className={['storybook-button', `storybook-button--large`].join(
									' '
								)}
								style={{ color: 'blue' }}
								onClick={() => {
									joinKnight;
								}}
							/>
							Knight
							<button
								type="button"
								className={['storybook-button', `storybook-button--large`].join(
									' '
								)}
								style={{ color: 'green' }}
								onClick={() => {
									joinMage;
								}}
							/>
							Mage
						</>
					) : (
						<>
							<span className="noTribes">
								<b>Please connect your wallet to join a tribe!</b>
							</span>
						</>
					)}
				</div>
			</div>
		</header>
	);
};

JoinTribe.propTypes = {};

JoinTribe.defaultProps = {};
