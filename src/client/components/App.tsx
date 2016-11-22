import * as React from 'react';

import Chat from './Chat';
import Game from './Game';
import Navbar from '../containers/NavContainer';
export default () => (
    <div className='App'>
        <Navbar />
        <Chat />
        <Game />
    </div>
);