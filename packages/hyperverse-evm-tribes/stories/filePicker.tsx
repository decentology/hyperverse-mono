import React from 'react';
import { useState } from 'react';
import './button.css';
import axios from 'axios';

export const UploadFile = () => {
	const [selectedFile, setSelectedFile] = useState(null);
	const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	/**
	 * Move handleSubmission button to addTribes component
	 * to handle submitting the file and additional info needed.
	 */
	const handleSubmission = (event) => {
		event.preventDefault();
		console.log('is submitting')
	};

	return (
		<div>
			<input type="file" name="file" onChange={changeHandler} />
			{isFilePicked ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>lastModifiedDate: {selectedFile.lastModifiedDate.toLocaleDateString()}</p>
				</div>
			) : (
				<p>Select a file</p>
			)}
			<div>
				<button
					type="button"
					className={['storybook-button', `storybook-button--large`].join(' ')}
					style={{ color: 'green' }}
					onClick={handleSubmission}
				>
					Submit
				</button>
			</div>
		</div>
	);
};
