import { styled } from '../../../stitches.config'
import { PlaygroundTab } from './PlaygroundTab'
import { PlaygroundBody } from './PlaygroundBody'
import { useRouter } from 'next/router'

export const Playground = () => {
	const router = useRouter()
	return (
		<>
			<Container>
				<PlaygroundTab />
        {/* Forces dynamic route pages to remount when changing route */}
				<PlaygroundBody key={router.asPath} />
			</Container>
		</>
	)
}

const Container = styled('div', {
	display: 'flex',
	marginTop: 40,
})
