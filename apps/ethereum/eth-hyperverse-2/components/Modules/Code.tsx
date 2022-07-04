import React from 'react'
import { styled } from '../../stitches.config'
import { InfoBox } from '../InfoBox'
import { CopyBlock, dracula } from 'react-code-blocks'
import { CodeContainer } from './GetStarted'

export const Code = () => {
  const sample = `  const { mint } = useERC721()
  
  return <button type="button" onClick={() => { mint({ to: address, file: file })}}>Mint</button>`
  return (
    <Container>
      <SubContainer>
        <InfoBox
          to=""
          name="Storybook"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
          color="gradientPink"
          size="md"
        />
        <InfoBox
          to=""
          name="Sample App"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
          color="gradientYellow"
          size="md"
        />
      </SubContainer>
      <Snippets>
        <Heading>Code Snippets</Heading>
        <Container>
          <FunctionName>Mint</FunctionName>
          <CodeContainer>
            <CopyBlock
              language="jsx"
              text={sample}
              theme={dracula}
              wrapLines={true}
              codeBlock
              showLineNumbers={false}
            />
          </CodeContainer>
        </Container>
        <Container>
          <FunctionName>Mint</FunctionName>
          <CodeContainer>
            <CopyBlock
              language="jsx"
              text={sample}
              theme={dracula}
              wrapLines={true}
              codeBlock
              showLineNumbers={false}
            />
          </CodeContainer>
        </Container>
        <Container>
          <FunctionName>Mint</FunctionName>
          <CodeContainer>
            <CopyBlock
              language="jsx"
              text={sample}
              theme={dracula}
              wrapLines={true}
              codeBlock
              showLineNumbers={false}
            />
          </CodeContainer>
        </Container>
      </Snippets>
    </Container>
  )
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
  height: '100% ',
  marginY: 12,
})

const SubContainer = styled('div', {
  display: 'grid',
  columnGap: '1rem',
  gridTemplateColumns: 'repeat(3, minmax(300px, 0.6fr))',
  gridTemplateRows: '233px',
})

const Snippets = styled('div', {
  marginTop: 40,
})

const Heading = styled('h1', {
  fontSize: '1.4rem',
  fontWeight: 500,
})

const FunctionName = styled('h2', {
  fontSize: '1.1rem',
  fontWeight: 400,
})
