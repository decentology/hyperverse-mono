import { mediaQueries } from '../../stitches.config';
import { createContainer } from 'unstated-next';
import { useMedia } from 'use-media';

function useMediaQuery() {

  const mobile = useMedia(mediaQueries.mobile);
  const tablet = useMedia(mediaQueries.tablet);
  const tabletLandscape = useMedia(mediaQueries.tabletLandscape);
  const laptop = useMedia(mediaQueries.laptop);
  const desktop = useMedia(mediaQueries.desktop);
  const desktopLg = useMedia(mediaQueries.desktopLg);

  return {
    mobile,
    tablet,
    tabletLandscape,
    laptop,
    desktop,
    desktopLg,

  };
}

export const MediaQuery = createContainer(useMediaQuery);
