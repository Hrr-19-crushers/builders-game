import * as React from 'react';

import HealthbarContainer from '../containers/HealthbarContainer';

export default ({users}) => (
  <div className='gameDisplay'>
    <HealthbarContainer />
     <span><span className='users'>{users}</span> players are currently in your party.</span>
     <span>/8 treasure collected.</span>
  </div>
)