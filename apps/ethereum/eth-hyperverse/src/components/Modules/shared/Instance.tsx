import { useEthereum } from '@decentology/hyperverse-ethereum'
import { useRouter } from 'next/router'
import { styled } from '../../../../stitches.config'
import { SmartModules } from '../../Playground/PlaygroundBody'
import { InstanceContainer } from './CreateInstance'
import { CopyIcon } from './ModuleStyles'

export const Instance = ({ instance }: { instance: string }) => {
  const router = useRouter()
  const { module } = router.query

  const moduleDefault = module?.toString() ?? 'erc721'
  const { account } = useEthereum()

	

  return (
    <InstanceContainer>
      <Name>
        {SmartModules[moduleDefault].title}
        &nbsp;Instance
      </Name>
      <Address>
        <p>{instance}</p>
        <CopyButton>
          <button
            onClick={() => {
              instance ? navigator.clipboard.writeText(instance) : instance && navigator.clipboard.writeText(instance)
            }}
          >
            <CopyIcon />
          </button>
        </CopyButton>
      </Address>
    </InstanceContainer>
  )
}

const Name = styled('h2', {
  fontFamily: '$mono',
  fontWeight: '400',
  fontSize: 14,
})

const Address = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontFamily: '$mono',
  fontWeight: '400',
  fontSize: 12,
  backgroundColor: '$grey100',
  padding: '10px 14px',
  borderRadius: 6,
  p: {
    marginRight: 10,
  },
})

const CopyButton = styled('div', {
  display: 'flex',
  alignItems: 'center',
  ':hover': {
    opacity: 0.8,
  },

  button: {
    cursor: 'pointer',
    outline: 'none',
    border: 'none',
    width: 13,
    height: 13,
    background: 'transparent',
  },
})
