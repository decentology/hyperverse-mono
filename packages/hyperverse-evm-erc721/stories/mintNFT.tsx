import * as PropTypes from 'prop-types';
import { useERC721 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';
import './style.css';

export const MintNFTForm = ({ ...props }) => {
	const { MintNFT } = useERC721();
	const { address } = useEvm();
	const { mutate } = MintNFT();

	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				if (address) {
					mutate({ to: address });
				} else {
					console.error();
				}
			}}
		>
			Mint NFT
		</button>
	);
};

MintNFTForm.propTypes = {
	to: PropTypes.string.isRequired,
};

MintNFTForm.defaultProps = {};

// const minting = state === 'minting';
// const minted = state === 'minted';

// const buttonState = minting ? 'form__button--submitting' : 'form__button--submitted';

// Need to call mintNFT() for the contract call
// to create an NFT
// Address will be passed in from props
// const handleSubmit = (e) => {
// 	e.preventDefault();
// 	{
// 		mintNFT;
// 	}
// 	console.log(e.target.address.value);
// };

// 	return (
// 		<form className="form" onSubmit={handleSubmit}>
// 			<h1 className="form__title">Mint NFT</h1>
// 			{minted ? (
// 				<div className="form__status">You have successfully minted your NFT.</div>
// 			) : null}
// 			<label htmlFor="name" className="form__label">
// 				Enter the address below
// 			</label>
// 			<p>
// 				<input
// 					type="text"
// 					id="address"
// 					placeholder="Address"
// 					disabled={minting}
// 					className="form__input"
// 				/>
// 			</p>
// 			<p>
// 				<button type="submit" disabled={minting} className={`form__button ${buttonState}`}>
// 					Mint
// 				</button>
// 			</p>
// 		</form>
// 	);
// };
