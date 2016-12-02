import * as React from 'react';

const titles = [
  ' brings magic potions to the quest',
  ' wields a big sword',
  ' keeps our spirits up',
  ' has the eyes of an eagle',
  ' has an otherworldly sense',
  ' talks to trees'
];

export default ({user, isAuth}) => {
  return (<div className='userMenu'>
    <p className='menuName'>
      { user
        ? user + titles[Math.floor(Math.random() * titles.length)]
        : `What\'s your name? Type '\\name [your name]' to set it`}
    </p>
  </div>
  )
}