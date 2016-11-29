import * as React from 'react';

export default ({win, lose}) => {
  if (lose) {
    return (
      <div className='lose'>
        <p className='endGameMessage'>You didn't make it.</p> 
        <p className='endGameMessage'>New game starting...</p></div>
    );
  }
  if (win) {
    return (
      <div className='win'>
        <p className='endGameMessage'>You won!</p>
        <p className='endGameMessage'>New game starting...</p>
      </div>
    );
  }
  return (<div></div>);
}