import * as React from 'react';

import NavBar from '../components/NavBar';

export default ({children}) => (
  <div className='App'>
    <NavBar/> 
    {children}
  </div>
);