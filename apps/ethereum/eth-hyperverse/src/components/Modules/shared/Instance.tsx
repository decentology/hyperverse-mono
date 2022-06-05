
import { useEthereum } from '@decentology/hyperverse-ethereum'
import { useRouter } from 'next/router'
import { styled } from '../../../../stitches.config'
import { SmartModules } from '../../Playground/PlaygroundBody'
import { InstanceContainer } from './CreateInstance'

export const Instance = ({instance}: {instance:string}) => {
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
        <Address>{instance}</Address>

		</InstanceContainer>
	)
}

const Name = styled('h2', {
	fontFamily: '$mono',
	fontWeight: '400',
	fontSize: 14,
})

const Address = styled('div', {
  fontFamily: '$mono',
  fontWeight: '400',
  fontSize: 12,
  backgroundColor: '$grey100',
  padding: '10px 14px',
  borderRadius: 6,
})