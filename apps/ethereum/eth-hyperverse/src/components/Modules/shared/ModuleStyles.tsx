import { Trigger, List, Content } from '@radix-ui/react-tabs'
import { Root, Viewport, Scrollbar, Thumb } from '@radix-ui/react-scroll-area'

import { styled } from '../../../../stitches.config'
const SCROLLBAR_SIZE = 2

export const ModuleTabs = {
  DASHBOARD: 'dashboard',
  PLAYGROUND: 'playground',
  CODE: 'code',
} as const

export type ModuleTabs = typeof ModuleTabs[keyof typeof ModuleTabs]

export const ModuleContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: 24,

  overflowY: 'auto',

  
})

export const Heading = styled('h1', {
  fontFamily: '$mono',
  fontSize: 18,
  fontWeight: '400',
  marginRight: 8,
})

export const Header = styled(List, {
  display: 'flex',
  borderBottom: '1px solid rgba(255,255,255, 0.5)',
  paddingBottom: 2,
  marginBottom: 14,
})

export const PanelTrigger = styled(Trigger, {
  color: 'rgba(255,255,255, 0.5)',
  marginRight: 10,
  padding: '10px 8px 8px 0',
  cursor: 'pointer',
  background: 'transparent',
  border: 'none',

  variants: {
    active: {
      true: {
        color: 'rgba(255,255,255, 0.9) !important',
        borderBottom: '2px solid #fff',
        marginBottom: -4,
      },
    },
  },
})

export const ContentContainer = styled(Content, {
  maxHeight: 550,
  overflowY: 'auto',

})

export const ContentGrid = styled(Content, {
  maxHeight: 550,
  overflowY: 'auto',
  display: 'grid',
  columnGap: 20,
  gridTemplateColumns: 'repeat(3, 265px)',
  justifyContent: 'center',
  marginTop: 26,
  rowGap: 20,
})

export const ScrollArea = styled(Root, {
  width: '100%',
  maxWidth: 1200,
  height: 540,
  borderRadius: 4,
  overflow: 'hidden',
})

export const ViewportStyled = styled(Viewport, {
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
})

export const ScrollbarStyled = styled(Scrollbar, {
  display: 'flex',
  // ensures no selection
  userSelect: 'none',
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: 'none',
  padding: 2,
  background: '$blue200',
  transition: 'background 160ms ease-out',
  '&:hover': { background: '#342F4E' },
  '&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE },
  '&[data-orientation="horizontal"]': {
    flexDirection: 'column',
    height: SCROLLBAR_SIZE,
  },
})

export const ThumbStyled = styled(Thumb, {
  flex: 1,
  background: '#fff',
  borderRadius: SCROLLBAR_SIZE,
  // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    minWidth: 44,
    minHeight: 44,
  },
})

export const CopyIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28">
      <g transform="matrix(1.1666666666666667,0,0,1.1666666666666667,0,0)">
        <path
          fill="#ffffff"
          fillRule="evenodd"
          d="M19.5 7C19.5 6.44772 19.9477 6 20.5 6H22C23.1046 6 24 6.89543 24 8V22C24 23.1046 23.1046 24 22 24H8C6.89543 24 6 23.1046 6 22V20.5C6 19.9477 6.44772 19.5 7 19.5C7.55228 19.5 8 19.9477 8 20.5V22H22V8H20.5C19.9477 8 19.5 7.55228 19.5 7Z"
          clipRule="evenodd"
        ></path>
        <path
          fill="#ffffff"
          fillRule="evenodd"
          d="M2 0C0.895431 0 0 0.895429 0 2V16C0 17.1046 0.895429 18 2 18H16C17.1046 18 18 17.1046 18 16V2C18 0.895431 17.1046 0 16 0H2Z"
          clipRule="evenodd"
        ></path>
      </g>
    </svg>
  )
}
