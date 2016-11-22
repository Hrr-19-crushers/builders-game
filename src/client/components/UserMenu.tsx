import * as React from 'react';

export default ({user, isAuth}) => {
  console.log(user);
  return (<div className='menu'>
    {user || `What\s your name? Type '\\name [your name]' to set it`}
  </div>
  )
}