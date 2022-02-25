
import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { useToken } from '../../source/useToken';
import { Box, Item, TriggerContainer, Trigger, Parameters, Input, Content, Button} from './WriteComponents'
 
const CreateInstance = () => {
  const { address } = useEthereum();
  const { NewInstance } = useToken();
  const { mutate } = NewInstance();
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenDecimals, setTokenDecimals] = useState(0);

  const createNewInstance = async () => {
    try {
      const instanceData = {
        account: address,
        name: tokenName,
        symbol:tokenSymbol,
        decimal:tokenDecimals,
      }

      mutate(instanceData);
    } catch (error) {
      throw error;
    }
  }


  return (
    <Box>
      <h4>New Instance</h4>
      <p>Create your own instance of a token </p>
      <Accordion.Root type="single" collapsible>
      <Item value='item-1'>
        <TriggerContainer>
          <Trigger>
              New Instance
          </Trigger>
        </TriggerContainer>
        <Parameters>
        <Content>
          <Input disabled={!address} placeholder='Token Name' onChange={(e) => setTokenName(e.target.value)} />
          <Input disabled={!address} placeholder='Token Symbol' onChange={(e) => setTokenSymbol(e.target.value)} />
          <Input disabled={!address} type="number" min="0" placeholder='Token Decimal' onChange={(e) => setTokenDecimals(e.currentTarget.valueAsNumber)} />
          <Button disabled={!address} onClick={createNewInstance}>{!address ? 'Connet Wallet' : 'Create Instance'}</Button>
        </Content>
        </Parameters>
      </Item>
    </Accordion.Root>
    </Box>
    
  )
}

export default CreateInstance;
