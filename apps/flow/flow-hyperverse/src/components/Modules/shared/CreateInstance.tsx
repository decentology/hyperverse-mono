import { styled, keyframes } from '../../../../stitches.config'
import { motion } from 'framer-motion'
import { Close, Root as Dialog, Trigger, Portal, Content as DialogContent, Overlay } from '@radix-ui/react-dialog'
import { Exit } from '../../icons'
import { useRouter } from 'next/router'
import { MODULES } from '../../../consts'

function Content({ children, ...props }: { children: React.ReactNode }) {
  return (
    <Portal>
      <StyledOverlay />
      <StyledContent {...props}>{children}</StyledContent>
    </Portal>
  )
}

type ReadFunctionProps = {
  createInstanceFn: () => void
}

export const ReadFunction = ({ createInstanceFn }: ReadFunctionProps) => {
  const router = useRouter()
  const { module } = router.query

  const moduleDefault = module?.toString() ?? 'erc721'
  const functionName = 'Create Instance'
  const description = `Create a new instance of the ${module} smart module.`

  return (
    <Dialog>
      <Container>
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
              <InputContainer>
                {Object.values(MODULES[moduleDefault].args).map((item) => {
                  {
                    console.log(item)
                  }
                  return <Input required={true} key={item} placeholder={item} />
                })}
                <Button
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.1 },
                  }}
                >
                  {functionName}
                </Button>
              </InputContainer>
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
      </Container>
    </Dialog>
  )
}

const Container = styled('div', {
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
