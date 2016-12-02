import * as React from 'react';

import {runGame} from '../game';
import {getGameState} from '../store';

export default class Game extends React.Component < any, any > {
  private componentDidMount() {
    // if this is first render we don't want to render game until we get layout from server
    if (getGameState().gameBoard) {
      runGame();
    }
  }

  public render() {
    return (
      <div className='game' id='game'></div>
    );
  }
}