//TODO: attribution https://codepen.io/sloveland/pen/AJFaE?editors=1010
import * as React from 'react';

export default ({move, action})=> (
  <div className='controller'>
    <div className="d-pad">
      <div id="d-up" className="button d up" onClick={() => move('up')}></div>
      <div id="d-right" className="button d right" onClick={() => move('right')}></div>
      <div id="d-down" className="button d down" onClick={() => move('down')}></div>
      <div id="d-left" className="button d left" onClick={() => move('left')}></div>
    </div>

    <div className="control-buttons">
      <div id="control-a" 
        className="button control a" 
        onClick={()=> action('A')}>
        <span className="label">A</span>
      </div>
      <div id="control-b"
        className="button control b"
        onClick={()=> action('B')}>
        <span className="label">B</span>
      </div>
    </div>
    
    <span className='controllerLabel'>Team Crushers 2016</span>
  </div>
);