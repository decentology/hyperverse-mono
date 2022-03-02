import { styled } from '../stitches.config';
import * as Accordion from '@radix-ui/react-accordion';

export const Box = styled('div', {
  minHeight: '150px',
  maxWidth: '220px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '$blue500',
  borderRadius:'10px',
  color: 'white',
  padding: '30px 20px',
  alignItems: 'center',
  textAlign: 'center',
  '& h4': {
    marginTop: '10px',
    fontSize: '1.2rem',
    fontWeight: '500',
  },
  '& p' : {
    margin: '10px 0 30px',
    fontSize: '0.8rem',
  },

  variant : {
    active : {
     true : {
      maxHeight: '150px',
     }
    }
  }
})


export const Button = styled('button', {
  minWidth: '150px',
	backgroundColor: '$yellow100',
	outline: 'none',
	border: 'none',
	padding: '10px 15px',
	borderRadius: '90px',
	cursor: 'pointer',
  margin: '10px auto -5px',
  '&:hover': {
    opacity: 0.8,
  }
})

export const TriggerContainer = styled(Accordion.Header, {
  margin: '0 !important',
})


export const Trigger = styled(Accordion.Trigger, {
  minWidth: '130px',
	backgroundColor: '$blue200',
	outline: 'none',
	border: 'none',
	padding: '10px 15px',
	borderRadius: '90px',
	cursor: 'pointer',
  margin: '10px auto 0',
 
})

export const Parameters = styled(Accordion.Content, {
  display: 'flex',
  flexDirection: 'column',
})

export const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  marginTop: '10px',
})

export const Input = styled('input', {
  width: '200px',
  margin: '3px 0',
  padding: '5px',
  backgroundColor: '$gray200',
  border: 'none',
  color: 'white',

})

export const Item = styled(Accordion.Item, {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  
})


export const Module = styled('p', {
  margin: '5px 0 -8px !important',
  padding: 0,
})