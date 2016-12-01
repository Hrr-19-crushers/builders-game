import * as React from 'react';

import HealthbarContainer from '../containers/HealthbarContainer';

export default ({users, collected}) => (
  <div className='gameDisplay'>
    <HealthbarContainer />
     <span className='user'><span className='users'>{users}</span> players are currently in your party</span>
     <span className='collect'><span className='collected'>{collected}/4</span> treasure collected</span>
  </div>
)