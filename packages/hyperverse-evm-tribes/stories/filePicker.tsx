import React from 'react';
import { useState } from 'react';
import './button.css';

export const UploadFile = () => {
	const [selectedFile, setSelectedFile] = useState(null);
	const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const handleSubmission = (event) => {
		event.preventDefault();
		console.log('is submitting');
	};

	return (
		<div>
			<input type="file" name="file" onChange={changeHandler} />
			<span> Please upload an image </span>
			{isFilePicked ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>lastModifiedDate: {selectedFile.lastModifiedDate.toLocaleDateString()}</p>
				</div>
			) : (
				<p></p>
			)}
		</div>
	);
};
