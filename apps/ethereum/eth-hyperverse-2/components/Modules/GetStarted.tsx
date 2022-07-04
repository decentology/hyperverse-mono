import React, { useEffect } from 'react'
import { styled } from '../../stitches.config'
import { CopyBlock, railscast, dracula } from 'react-code-blocks'
import { Modules, ModulesInfo } from '../../utils/constants'
import { Initialize } from './Initialize'
import { useEthereum } from '@decentology/hyperverse-ethereum'
import { useERC721 } from '@decentology/hyperverse-evm-erc721'
import { useERC20 } from '@decentology/hyperverse-evm-erc20'
import { useQuery } from 'react-query'

export const GetStarted = ({ module }: { module: Modules }) => {
  const [proxy, seProxy] = React.useState<string>()

  const { account } = useEthereum()
  const erc721 = useERC721()
  const erc20 = useERC20()

  const { data: erc721Proxy, isLoading } = useQuery('instance', () => erc721.getProxy!(account), {
    enabled: !!erc721.factoryContract && !!account && module === Modules.erc721,
  })

  const { data: erc20Proxy, isLoading: loading2 } = useQuery('instance', () => erc20.getProxy!(account), {
    enabled: !!erc20.factoryContract && !!account && module === Modules.erc20,
  })

  const loading = isLoading || loading2

  useEffect(() => {
    if (module === Modules.erc721) {
      seProxy(erc721Proxy)
    } else if (module === Modules.erc20) {
      seProxy(erc20Proxy)
    }
  }, [erc721Proxy, erc20Proxy, module])

  const dependencies = `yarn add @decentology/hyperverse @decentology/hyperverse-ethereum @decentology/hyperverse-${Modules[module]}`

  const hyperverseInitialize = `  import { initialize, Provider, Network } from '@decentology/hyperverse'
  import { Ethereum } from '@decentology/hyperverse-ethereum'
  import * as ${ModulesInfo[module].name} from '@decentology/hyperverse-evm-${Modules[module]}'

  function MyApp ({ Component, pageProps }) {
    const hyperverse = initialize({
      blockchain: Ethereum,
      network: Network.Testnet,
        {
          bundle: ${ModulesInfo[module].name},
          tenantId: "${account}",
        },
      ],
    })
  
    return (
        <Provider initialState={hyperverse}>
            <Component {...pageProps} />
        </Provider>
    )
  }
`

  return (
    <>
      {!proxy  ? (
        <Initialize module={module} />
      ) : (
        <div>
          <Container>
            <Heading>Install Dependecies</Heading>
            <CodeContainer>
              <CopyBlock
                language="bash"
                text={dependencies}
                theme={dracula}
                wrapLines={true}
                codeBlock
                showLineNumbers={false}
              />
            </CodeContainer>
          </Container>
          <Container>
            <Heading>Initiazlie Hyperverse</Heading>
            <CodeContainer>
              <CopyBlock
                language="jsx"
                text={hyperverseInitialize}
                theme={railscast}
                wrapLines={true}
                codeBlock
                showLineNumbers={false}
              />
            </CodeContainer>
          </Container>
          <Container>
            <Heading>Boilerplates</Heading>
            <SubContainer>
              <SubHeading>NextJS</SubHeading>
              <CodeContainer>
                <CopyBlock
                  language="bash"
                  text={'git clone https://github.com/decentology/erc721-nextjs-boilerplate'}
                  theme={dracula}
                  wrapLines={true}
                  codeBlock
                  showLineNumbers={false}
                />
              </CodeContainer>
            </SubContainer>
          </Container>
        </div>
      )}
    </>
  )
}

const Container = styled('div', {
  marginBottom: '3rem',
  '&:last-child': {
    marginBottom: 0,
  },
})

const Heading = styled('h2', {
  fontSize: '1.2rem',
  fontWeight: 500,
  marginTop: 0,
})

const SubHeading = styled('h3', {
  fontSize: '1rem',
  fontWeight: 500,
  marginRight: '2rem',
})

const SubContainer = styled('div', {
  display: 'flex',
})

export const CodeContainer = styled('div', {
  display: 'flex',
  width: '100%',
  div: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderRadius: 4,
    background: '$black200',
    border: '1px solid $blue500',
    paddingY: 10,

    span: {
      borderRadius: 4,
      alignItems: 'center',
      code: {
        background: '$black200',
        fontSize: '0.9rem !important',
        fontFamily: '$mono !important',
      },
    },

    button: {
      background: '$black200',
      top: 12,
      right: 12,
      outline: 'none',
      border: 'none',
      cursor: 'pointer',
      margin: 0,
    },
  },

  variants: {
    variant: {
      preLine: {
        code: {
          whiteSpace: 'pre-line', }}

        
      
    }
  }
})