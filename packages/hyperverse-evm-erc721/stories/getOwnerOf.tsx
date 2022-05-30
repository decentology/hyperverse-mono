import { useEffect, useState } from 'react';
import { useERC721 } from '../source';

export const GetOwnerOf = ({ ...props }: { tokenId: string }) => {
	const { getOwnerOf } = useERC721();
	const [owner, setOwner] = useState('');
	useEffect(() => {
		if (getOwnerOf) {
			getOwnerOf(props.tokenId).then((value) => {
				setOwner(value);
			});
		}
	}, [getOwnerOf]);

	return (
		<div className="ownerOf">
			Owner Of: <b>{owner}</b>
		</div>
	);
};
