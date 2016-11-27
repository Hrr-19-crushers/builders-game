import * as React from 'react';

import Game from './Game';
import Chat from './Chat';
import GameDisplayContainer from '../containers/GameDisplayContainer';

export default() => (
  <div className='Main'>
    <GameDisplayContainer />
    <Chat/>
    <Game/>
  </div>
);