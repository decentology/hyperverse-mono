import React from 'react';

function Page(props) {
  return (
    <div className="container" style={{maxWidth: '960px'}}>
      {props.children}
    </div>
  );
}

export default Page;