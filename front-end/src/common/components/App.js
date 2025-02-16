import React from 'react';

import Header from './Header';

export default ({children}) => {
  return (
    <div id="container">
      <Header />
      {children}
    </div>
  );
}
