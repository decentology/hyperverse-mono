import React from 'react';
import classNames from 'classnames';
import {css, StyleSheet} from 'aphrodite/no-important';

const styles = StyleSheet.create({
  list: {
    maxWidth: '960px',
    margin: 'auto',
    padding: '0rem 3rem',
    '@media (max-width: 1024px)': {
      padding: '0rem 1.5rem',
    }
  }
});

function Tabs(props) {
  return (
    <div className="tabs">
      <ul className={css(styles.list)}>
        {props.pages.map((page) => {
          return (
            <li
              key={page.title}
              className={classNames({
                'is-active':props.current && page.title === props.current.title
              })}
            >
              <a onClick={() => props.onChange(page)}>{page.title}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Tabs;