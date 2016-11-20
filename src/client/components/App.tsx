import * as React from 'react';

import NavBar from './NavBar';

export default({children}) => (
  <div className='App'>
    <NavBar/> {children}
  </div>
);