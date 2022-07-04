import React, { useState } from 'react'
import { styled } from '../../stitches.config'
import { InfoBox } from '../InfoBox'
import { InputContainer, Label, StyledInput } from '../basics/Input'
import { InfoHeading } from '../basics/InfoHeading'
import { Modules, ModulesInfo } from '../../utils/constants'
import { Button } from '../basics/Button'
import { useEthereum } from '@decentology/hyperverse-ethereum'
import { useERC721 } from '@decentology/hyperverse-evm-erc721'
import { useERC20 } from '@decentology/hyperverse-evm-erc20'
import { useMutation } from 'react-query'


export const Initialize = ({module} : {module:Modules}) => {
  const { account } = useEthereum()
  const erc721 = useERC721()
  const erc20 = useERC20()
  const [inputs, setInputs] = useState<{[key: string]: string} >({})

  const { mutate: mutateERC721, isLoading: erc721Loading } = useMutation('createTokenInstance', erc721.createInstance)
  const { mutate: mutateERC20, isLoading: erc20Loading } = useMutation('createTokenInstance', erc20.createInstance)


  const loading = erc721Loading || erc20Loading

  const args = ModulesInfo[module].args

  const createInstance = async () => {
    try {
      const orderedArgs = args && Object.assign(
          Object.keys(args).map((x) => {
            return { [x]: inputs[x] }
          }),
        )

      if (module === Modules.erc721) {
        mutateERC721({
          account: account!, ...orderedArgs
        })
      } else if (module === Modules.erc20) {
        mutateERC20({
          account: account!, ...orderedArgs
        })
      }

    } catch (error) {
      console.error(error)
      throw(error)
    }
  }

  return (
    <InitizalizeContainer>
      <InfoContainer>
        <InfoBox
          to=""
          name="What is a Tenant"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
          color="gradientYellow"
          size="lg"
        />
      </InfoContainer>
      <SubContainer>
        <InfoHeading
          heading="Intialize Tenant"
          info="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
        />
        <Inputs>
          {args && Object.keys(args).map((key) => {
            return (
              <InputContainer key={key}>
                <Label>{args[key]}</Label>
                <StyledInput value={inputs[key]} placeholder={args[key]} onChange={(e) => setInputs({...inputs, [key]: e.target.value})} />
              </InputContainer>
                 
            )
          })}
        </Inputs>
        <ButtonContainer>
          <Button label="Create Tenant" onClick={createInstance} loading={loading} loadingLabel="Creating Tenant" />
        </ButtonContainer>
      </SubContainer>
    </InitizalizeContainer>
  )
}

const InitizalizeContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
  height: '100% ',
  marginY: 24,

  '@laptop': {
    flexDirection: 'row',
  },
})

const InfoContainer = styled('div', {
  position: 'relative',
  width: '100%',
  height: 300,
  marginRight: 24,

  '@laptop': {
    height: 433,
    minWidth: 480,
    maxWidth: 510,
  },
})

const SubContainer = styled('div', {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',

  width: '100%',
})

const Inputs = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  div: {
    marginBottom: 16,
  },
})

const ButtonContainer = styled('div', {
  display: 'flex',
  width: '100%',
  justifyContent: 'flex-end',
})
