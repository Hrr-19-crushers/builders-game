import * as React from 'react';
import { Link } from 'react-router';

export default () => (
  <ul className='nav'>
    {!isAuth &&
    <Login />
    }

    <Link activeClassName='active' to='/'>Login</Link>
    <Link activeClassName='active' to='/profile'>Profile</Link>
    <Link activeClassName='active' to='/dashboard'>Dashboard</Link>
  </ul>
);