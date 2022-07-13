import React from 'react'
import { styled } from '../../stitches.config'
import { InfoBox } from '../InfoBox'
import { CopyBlock, dracula } from 'react-code-blocks'
import { CodeContainer } from './GetStarted'
import { Modules, ModulesInfo } from '../../utils/constants'

export const Code = ({ module }: { module: Modules }) => {
	const codeSnippets = module && ModulesInfo[module].codeSnippets
	const storybook = ModulesInfo[module].storybook
	const sample = ModulesInfo[module].sample

	const subContainer = storybook && sample
	return (
		<Container>
			{subContainer && (
				<SubContainer>
					<InfoBox
						to={storybook}
						name="Storybook"
						description="View module details and additional documentation with Storybook."
						color="gradientPink"
						size="md"
						external
					/>

					<InfoBox
						to={sample}
						name="Sample App"
						description="Check out a sample app using this module for more inspiration!"
						color="gradientYellow"
						size="md"
						external
					/>
				</SubContainer>
			)}
			<Snippets>
				<Heading>Code Snippets</Heading>

				{codeSnippets &&
					codeSnippets.map((snippet) => {
						const read = `const { ${snippet.name} } = useERC721()

          <p>{${snippet.snippet}}</p>
          `
						const mutate = `  const { ${snippet.name} } = useERC721()
          
          return <button type="button" onClick={() => { ${snippet.snippet} }}>${snippet.name}</button>`
						return (
							<Container key={snippet.name}>
								<FunctionName>{snippet.name}</FunctionName>
								<CodeContainer variant="preLine">
									<CopyBlock
										language="jsx"
										text={snippet.type === 'read' ? read : mutate}
										theme={dracula}
										wrapLines={true}
										codeBlock
										showLineNumbers={false}
									/>
								</CodeContainer>
							</Container>
						)
					})}
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
	marginBottom: 40,
})

const Snippets = styled('div', {})

const Heading = styled('h1', {
	fontSize: '1.4rem',
	fontWeight: 500,
})

const FunctionName = styled('h2', {
	fontSize: '1.1rem',
	fontWeight: 400,
})
