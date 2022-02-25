
import { useState } from 'react';
import { styled } from '../../stitches.config';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { useToken } from '../../source/useToken';


const Transfer = () => {
  const { address } = useEthereum();
  const { Transfer } = useToken();
  const { mutate } = Transfer();
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState(0);


  const createNewInstance = async () => {
    try {
      const instanceData = {
        account: address,
        to:receiver,
        value:amount,
      }

      mutate(instanceData);
    } catch (error) {
      throw error;
    }
  }


  return (
    <Box>
      <h4>Transfer Tokens</h4>
      <p>Transfer Tokens to someone</p>
      <Accordion.Root type="single" collapsible>
      <Instance value='item-1'>
        <TriggerContainer>
          <Trigger>
             Tranfer Tokens
          </Trigger>
        </TriggerContainer>
        <Parameters>
        <Content>
          <Input disabled={!address} placeholder='Receiver' onChange={(e) => setReceiver(e.target.value)} />
          <Input disabled={!address} type="number" min="0" placeholder='Amount to transfer' onChange={(e) => setAmount(e.currentTarget.valueAsNumber)} />
          <Button disabled={!address} onClick={createNewInstance}>{!address ? 'Connet Wallet' : 'Transfer'}</Button>
        </Content>
        </Parameters>
      </Instance>
    </Accordion.Root>
    </Box>
    
  )
}

export default Transfer;

const Box = styled('div', {
  minHeight: '150px',
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
  margin: '10px auto -5px',
  '&:hover': {
    opacity: 0.8,
  }
})

const TriggerContainer = styled(Accordion.Header, {
  margin: '0 !important',
})


const Trigger = styled(Accordion.Trigger, {
  minWidth: '130px',
	backgroundColor: '$blue200',
	outline: 'none',
	border: 'none',
	padding: '10px 15px',
	borderRadius: '90px',
	cursor: 'pointer',
  margin: '10px auto 0',
 
})

const Parameters = styled(Accordion.Content, {
  display: 'flex',
  flexDirection: 'column',
})

const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  marginTop: '10px',
})

const Input = styled('input', {
  width: '200px',
  margin: '3px 0',
  padding: '5px',
  backgroundColor: '$gray200',
  border: 'none',
  color: 'white',

})

const Instance = styled(Accordion.Item, {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  
})