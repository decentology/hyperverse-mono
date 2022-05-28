import { styled } from '../../../stitches.config';
import Image from 'next/image';
import { useEthereum } from '@decentology/hyperverse-ethereum';

export function Nav() {
  // const { Connect, error } = useEthereum();
	return (
		<Container>
			<Image src="/images/Hyperverse.png" alt="Hyperverse" width={200} height={38} />
      {/* <Connect accountStatus="full"/> */}
      
		</Container>
	);
}

const Container = styled('div', {
	display: 'flex',

});

