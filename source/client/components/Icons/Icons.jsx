import React from 'react';

function Icons() {
  return (
    <svg
      style={{display: 'none'}}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <g id="MenuIcon">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </g>
        <g id="PersonIcon">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </g>
      </defs>
    </svg>
  );
}

export default Icons;