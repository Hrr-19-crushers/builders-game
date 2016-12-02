import * as React from 'react';

import {runGame} from '../game';
import {getGameState} from '../store';

export default class Game extends React.Component < any, any > {
  public componentDidMount() {
    if (getGameState().gameBoard) {
      runGame();
    }
  }

  public render() {
    return (<div className='game' id='game' />);
  }
}
