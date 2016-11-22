import * as React from 'react';
import { Link } from 'react-router';
import Login from '../components/Login';
import Logout from '../components/Logout';
import {logIn, logOut,} from '../utils/socket_io.ts'

export default ({isAuth}) => (

  <nav className='nav'>
    
    {!isAuth &&
     < Login logIn = { () => ( logIn() ) } />
    }
    {isAuth &&
     < Logout logOut = { () => ( logOut() ) } />
    }

    <Link activeClassName='active' to='/'>Home</Link>
    <Link activeClassName='active' to='/profile'>Profile</Link>
    <Link activeClassName='active' to='/dashboard'>Dashboard</Link>
  </nav>
);




    