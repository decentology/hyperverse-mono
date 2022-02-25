import { styled } from '../../stitches.config';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { useToken } from '../../source/useToken';

const shortenHash = (hash: string = '', charLength: number = 6, postCharLength?: number) => {
	let shortendHash;
	if (postCharLength) {
		shortendHash =
			hash.slice(0, charLength) +
			'...' +
			hash.slice(hash.length - postCharLength, hash.length);
	} else {
		shortendHash = hash.slice(0, charLength);
	}
	return shortendHash;
};

const GetProxy = () => {
  const { address } = useEthereum();
  const { Proxy } = useToken();
  const { data, refetch }  = Proxy();
  
  return (
    <Box>
      <h4>Get Proxy</h4>
      <p>Get your Token Instance address</p>
      <Button disabled={!address}>{!address ? 'Connet Wallet' : !data ? 'Get Proxy' : shortenHash(data, 5,5) }</Button>
    </Box>
    
  )
}

export default GetProxy ;
const Box = styled('div', {
  maxHeight: '150px',
  maxWidth: '220px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '$blue500',
  borderRadius:'10px',
  color: 'white',
  padding: '30px 20px',
  alignItems: 'center',
  '& h4': {
    marginTop: '10px',
    fontSize: '1.2rem',
    fontWeight: '500',
  },
  '& p' : {
    margin: '10px 0 30px',
    fontSize: '0.8rem',
  }
})


const Button = styled('button', {
  minWidth: '150px',
	backgroundColor: '$yellow100',
	outline: 'none',
	border: 'none',
	padding: '10px 15px',
	borderRadius: '90px',
	cursor: 'pointer',
  margin: '10px auto 0',
  '&:hover': {
    opacity: 0.8,
  }
})

