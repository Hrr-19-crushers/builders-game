import * as React from 'react';

import {logIn, logOut} from '../utils/socket_io';

export default ({isAuth}) => (
  <button className='login' onClick={ isAuth ? logOut :  logIn} >
    {isAuth ? 'Logout' : 'Login'}
  </button>
);
