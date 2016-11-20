import * as React from 'react';

import Game from './Game';
import Chat from './Chat';

export default() => (
  <div className='Main'>
    <Chat/>
    <Game/>
  </div>
);