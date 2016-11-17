import * as React from 'react';

export default ({turnNum, prompt, votes}) => (
  <div className='turnDisplay'>
    <h2>Turn #{turnNum}</h2>
    <p>{ prompt }</p>
     {votes.map(choice => (
      <div><span className='choice'>{choice.name}</span><span className='count'> {choice.count}</span></div>))
    }
  </div>
);