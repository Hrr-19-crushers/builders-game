import * as React from 'react';

export default ({user}) => {
  console.log(user);
  return (<div className='menu'>
    {user || 'Guest'}
  </div>
  )
}