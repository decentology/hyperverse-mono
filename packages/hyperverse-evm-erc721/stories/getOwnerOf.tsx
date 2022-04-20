import { use } from 'chai';
import * as PropTypes from 'prop-types';
import { useERC721 } from '../source';

export const GetOwnerOf = ({ ...props }) => {
	const { OwnerOf } = useERC721();
	const { data: tokenOwner } = OwnerOf(0); // wants a token Id

	return (
		<div className="ownerOf">
			Owner Of: <b>{tokenOwner}</b>
		</div>
	);
};

GetOwnerOf.propTypes = {
	tokenId: PropTypes.number.isRequired,
};

GetOwnerOf.defaultProps = {};
