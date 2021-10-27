import React from 'react';

function Page(props) {
  return (
    <div className="container">
      {props.children}
    </div>
  );
}

export default Page;