import * as React from 'react';
import { Link } from 'react-router';

export default () => (
  <ul className='nav'>
    <Link activeClassName='active' to='/'>Home</Link>
    <Link activeClassName='active' to='/profile'>Profile</Link>
    <Link activeClassName='active' to='/dashboard'>Dashboard</Link>
  </ul>
);