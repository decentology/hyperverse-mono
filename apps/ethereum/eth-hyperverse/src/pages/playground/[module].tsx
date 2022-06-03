import { useRouter } from 'next/router'
import { Nav } from '../../components/Playground/Nav'
import { Playground } from '../../components/Playground'

export default function PlaygroundTabs() {
  const router = useRouter()
  const { module } = router.query
  console.log(module)

  return (
    <>
      <main>
        <Nav />
        <Playground />
      </main>
    </>
  )
}
