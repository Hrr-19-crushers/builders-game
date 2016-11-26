//https://codepen.io/sloveland/pen/AJFaE?editors=1010
import * as React from 'react';

export default ()=> (
  <div>
    <div className="d-pad">
      <div id="d-up" className="button d up"></div>
      <div id="d-right" className="button d right"></div>
      <div id="d-down" className="button d down"></div>
      <div id="d-left" className="button d left"></div>
    </div>

   <div className="control-buttons">
      <div id="control-a" className="button control a"><span className="label">A</span></div>
      <div id="control-b" className="button control b"><span className="label">B</span></div>
    </div>
    <span className='controllerLabel'>Team Crushers 2016</span>
  </div>
);