import * as React from 'react';

import Game from './Game';
import Chat from './Chat';
import GameDisplay from './GameDisplay';

export default() => (
  <div className='Main'>
    <GameDisplay />
    <Chat/>
    <Game/>
  </div>
);