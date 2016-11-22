import * as React from 'react';
import NavBar from '../containers/NavContainer';

export default({children}) => (
  <div className='App'>
    <NavBar/> {children}
  </div>
);