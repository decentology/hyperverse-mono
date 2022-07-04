import React from 'react'
import { styled } from '../../stitches.config'
import { InfoBox } from '../InfoBox'
import { Input } from '../basics/Input'
import { InfoHeading } from '../basics/InfoHeading'
import { Button } from '../basics/Button'
export const Intialize = () => {
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
          <Input label="ERC721 Name" />
          <Input label="ERC721 Symbol" />
        </Inputs>
        <ButtonContainer>
          <Button label="Create Tenant" />
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
