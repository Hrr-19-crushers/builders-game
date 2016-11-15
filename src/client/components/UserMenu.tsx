import * as React from 'react';

export default ({user}) => (
  <div className='menu'>
    {user || 'Guest'}
  </div>
)