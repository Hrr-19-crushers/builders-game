import * as React from 'react';

import Chat from './Chat';
import Game from './Game';
import Navbar from './NavBar';

export default () => (
    <div>
        <Navbar />
        <Game />
        <Chat />
    </div>
);