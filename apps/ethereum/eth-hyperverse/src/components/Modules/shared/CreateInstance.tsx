import { styled, keyframes } from '../../../../stitches.config'
import { motion } from 'framer-motion'
import { Close, Root as Dialog, Trigger, Portal, Content as DialogContent, Overlay } from '@radix-ui/react-dialog'
import { Exit } from '../../icons'
import { useRouter } from 'next/router'
import { MODULES } from '../../../consts'
import { useState } from 'react'
import { useEthereum } from '@decentology/hyperverse-ethereum'
import { Loader } from '../../../components/basics/Loader'
import { CenterContainer} from './Dashboard'

function Content({ children, ...props }: { children: React.ReactNode }) {
  return (
    <Portal>
      <StyledOverlay />
      <StyledContent {...props}>{children}</StyledContent>
    </Portal>
  )
}

type ReadFunctionProps = {
  createInstanceFn: any
  txnLoading: boolean
}

export const CreateInstance = ({ createInstanceFn, txnLoading }: ReadFunctionProps) => {
  const router = useRouter()
  const { module } = router.query
  const { account } = useEthereum()

  const moduleDefault = module?.toString() ?? ('erc721' as any)

  //@ts-ignore
  const ARGUMENTS = MODULES[moduleDefault].args
  const functionName = 'Create Tenant'
  const description = `Create your own tenant of the ${module} smart module.`
  const [test, setTest] = useState({})


	console.log(txnLoading);
  const createNewInstance = async () => {
    try {
      //@ts-ignore
      const orderedArgs = Object.assign(
        ...Object.keys(ARGUMENTS).map((x) => {
          //@ts-ignore
          return { [x]: test[x] }
        }),
      )

      createInstanceFn({
        account: account!,
        ...orderedArgs,
      })
    } catch (error) {
      throw error
    }
  }
  // Check Discordc

  console.log()

  return (
    <Dialog>
      <InstanceContainer>
        <Info>
          <Name>{functionName} </Name>
          <Description>{description}</Description>
        </Info>

	
        {moduleDefault ? (
          <>
            <Trigger asChild>
              <Button
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.1 },
                }}
              >
                {functionName}
              </Button>
            </Trigger>

            <Content>
              <DialogClose>
                <h2>{functionName}</h2>
                <Exit />
              </DialogClose>
							{txnLoading ? (<CenterContainer css={{marginTop:20, height: 'fit-content'}}> 
								<Loader/> 
								</CenterContainer>)
								: 
              <InputContainer>
                {Object.keys(ARGUMENTS).map((item) => {
                  return (
                    <Input
                      required={true}
                      key={item}
                      placeholder={ARGUMENTS[item]}
                      onChange={(e) => {
                        setTest((prev) => ({ ...prev, [item]: e.target.value }))
                      }}
                      //@ts-ignore
                      value={test[item]}
                    />
                  )
                })}
                <Button
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.1 },
                  }}
                  onClick={createNewInstance}
                >
                  {functionName}
                </Button>
              </InputContainer>
}
            </Content>
          </>
        ) : (
          <Button
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.1 },
            }}
          >
            {functionName}
          </Button>
        )}
      </InstanceContainer>
    </Dialog>
  )
}

export const InstanceContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '$blue200',
  borderRadius: 14,
  padding: 20,
  boxShadow: '2px 2px 2px #342F4E',
  width: '95%',
})

const Info = styled('div', {
  display: 'flex',
  flexDirection: 'row',
})

const Name = styled('h2', {
  fontFamily: '$mono',
  fontWeight: '400',
  fontSize: 14,
})

const Description = styled('p', {
  fontSize: 12,
  margin: 'auto 12px',
})

export const Button = styled(motion.button, {
  fontFamily: '$mono',
  color: '$white100',
  border: 'none',
  padding: '10px 16px',
  background: 'linear-gradient(93deg, #8CC760 0%, #3898FF 100%)',
  boxShadow: '2px 4px 12px rgba(140, 199, 96, 0.15)',
  borderRadius: '14px',
  cursor: 'pointer',
  minWidth: 160,
})

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
})

const StyledOverlay = styled(Overlay, {
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  position: 'fixed',
  inset: 0,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
})

const StyledContent = styled(DialogContent, {
  backgroundColor: '$blue300',
  borderRadius: 6,
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 250,
  maxWidth: '450px',
  maxHeight: '85vh',
  padding: 25,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
  '&:focus': { outline: 'none' },
})

const DialogClose = styled(Close, {
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  background: 'transparent',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  h2: {
    fontFamily: '$mono',
    fontWeight: '400',
    fontSize: 14,
    color: '$white100',
  },
  svg: {
    width: '12px',
  },
})

const Input = styled('input', {
  position: 'relative',
  border: 'none',
  outline: 'none',
  padding: '18px 16px',
  background: '$white100',
  borderRadius: '8px',
  cursor: 'pointer',
  width: '90%',
  marginBottom: '10px',
  fontFamily: '$mono',
  fontWeight: '400',

  '&:last-child': {
    marginBottom: 0,
  },
})

const InputContainer = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  marginTop: 18,
})

const Submit = styled('input', {
  display: 'flex',
})
