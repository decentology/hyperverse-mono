import { styled, keyframes } from '../../../stitches.config'

export const Loader = () => {
  return (
    <LoaderContainer />
  )
}

const ring = keyframes({
  0:{
    transform: 'rotate(0deg)'
  },
  '100%':{
    transform: 'rotate(360deg)'
  }
})
const LoaderContainer = styled('div', {
  display: 'inline-block',
  width: 90,
  height: 90,

  '&:after': {
    content: ' ',
    display: 'block',
    width: '64px',
    height: '64px',
    margin: '8px',
    borderRadius: '50%',
    border: '6px solid #fff',
    borderColor: '#fff transparent #fff transparent',
    animation: `${ring} 1.2s linear infinite`,
  }
})

