import React from 'react';
import classNames from 'classnames';

function Tabs(props) {
  return (
    <div className="tabs">
      <ul>
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