import { styled, keyframes } from '../../../stitches.config';

const pulse = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: '100%' },
});

export const Skeleton = styled('div', {
  backgroundColor: '$blue400',
  position: 'relative',
  overflow: 'hidden',

  '&::after': {
    animationName: `${pulse}`,
    animationDuration: '500ms',
    animationDirection: 'alternate',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
    backgroundColor: '$blue500',
    borderRadius: 'inherit',
    bottom: 0,
    content: '""',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});