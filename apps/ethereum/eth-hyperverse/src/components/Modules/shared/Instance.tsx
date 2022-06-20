import { useEthereum } from '@decentology/hyperverse-ethereum'
import { useRouter } from 'next/router'
import { styled } from '../../../../stitches.config'
import { SmartModules } from '../../Playground/PlaygroundBody'
import { InstanceContainer } from './CreateInstance'
import { CopyIcon } from './ModuleStyles'
import { MediaQuery } from '../../../context/MediaQuery'

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

export const Instance = ({ instance }: { instance: string }) => {
  const router = useRouter()
  const { module } = router.query

  const moduleDefault = module?.toString() ?? 'erc721'
  const { tablet } = MediaQuery.useContainer()
	

  return (
    <InstanceContainer>
      <Name>
        {/* @ts-ignore */}
        {SmartModules[moduleDefault].title}
        &nbsp;{tablet && "Tenant "}Contract
      </Name>
      <Address>
        <p>{tablet ? instance : shortenHash(instance, 4,4)}</p>
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
  marginRight: 10,
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
