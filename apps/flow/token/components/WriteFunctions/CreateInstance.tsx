
import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useFlow } from '@decentology/hyperverse-flow';
import { useToken } from '@decentology/hyperverse-flow-token';
import { Box, Item, TriggerContainer, Trigger, Parameters, Input, Content, Button } from './WriteComponents'

const CreateInstance = () => {
  const flow = useFlow();
  const token = useToken();

  const createNewInstance = async () => {
    await token.setup();
  }

  return (
    <Box>
      <h4>New Instance</h4>
      <p>Create your own instance of a Token</p>
      <Accordion.Root type="single" collapsible>
        <Item value='item-1'>
          <TriggerContainer>
            <Trigger disabled={!flow.user?.addr}>
              {!flow.user?.addr ? 'Connect Wallet' : 'Create Instance'}
            </Trigger>
          </TriggerContainer>
          <Parameters>
            <Content>
              <Button onClick={createNewInstance}>{!flow.user?.addr ? 'Connet Wallet' : 'Create Instance'}</Button>
            </Content>
          </Parameters>
        </Item>
      </Accordion.Root>
    </Box>
  )
}

export default CreateInstance;
