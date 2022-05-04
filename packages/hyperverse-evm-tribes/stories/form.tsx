import React from 'react';
import { useState } from 'react';
import { Styles } from './formStyles';

export const Form = () => {
	const [submitted, setSubmitted] = useState(false);
	const [values, setValues] = useState({ tribeName: '' });
	const [valid, setValid] = useState(false);
	const [data, setData] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const handleTribeName = (event) => {
		setValues({ ...values, tribeName: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (values.tribeName) {
			setValid(true);
		}
		setSubmitted(true);
	};

	return (
		<Styles>
			<form onSubmit={handleSubmit}>
				<label>Tribe Name</label>
				<input
					onChange={handleTribeName}
					value={values.tribeName}
					disabled={submitted}
                    type="text"
					name="tribeName"
					placeholder="Enter a name"
				/>
				{/* {submitted && !values.tribeName ? (
					<span> Please enter a name for your tribe </span>
				) : null} */}
				<label>Upload Image</label>
				<div>
					<input type="file" name="file" onChange={changeHandler} />
					{/* <span> Please upload an image </span> */}
					{isFilePicked ? (
						<div>
							<p>Filename: {selectedFile.name}</p>
							<p>Filetype: {selectedFile.type}</p>
							<p>Size in bytes: {selectedFile.size}</p>
							<p>
								lastModifiedDate:{' '}
								{selectedFile.lastModifiedDate.toLocaleDateString()}
							</p>
						</div>
					) : (
						<p></p>
					)}
				</div>
				<button
					type="submit"
					className={['storybook-button', `storybook-button--large`].join(' ')}
					style={{ color: 'green' }}
				>
					{' '}
					Add Tribe
				</button>
                {/* {submitted ? <div className="success-message"> Success! </div> : null} */}
			</form>
		</Styles>
	);
};
