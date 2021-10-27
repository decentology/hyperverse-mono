import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import {colors} from '../../../utilities';

const defaults = {
  color: colors.grey[800]
};

const styles = StyleSheet.create({
  Icon: {
    display: 'block'
  }
});

function Icon(props) {
  return (
    <svg
      className={css(styles.Icon)}
      style={{
        width: `24px`,
        height: `24px`,
        fill: props.color || defaults.color
      }}
      viewBox={`0 0 24 24`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <use href={`#${props.name}Icon`} />
    </svg>
  );
}

export default Icon;