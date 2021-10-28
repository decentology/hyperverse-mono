import React from 'react';
import {Link, useLocation} from 'react-router-dom';
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
  const location = useLocation();
  
  return (
    <div className="tabs">
      <ul className={css(styles.list)}>
        {props.pages.map((page) => {
          return (
            <li
              key={page.title}
              className={classNames({
                'is-active': page.path === location.pathname
              })}
            >
              <Link to={page.path}>{page.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Tabs;