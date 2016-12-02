import * as React from 'react';

import LoginContainer from '../containers/LoginContainer';

export default ({profile}) => (
  <div className="userBadge">
    <img
      className="userBadgeProfile"
      src={profile.nickname
      ? profile.picture
      : '../../assets/sprites/rogue.png'}></img>
    <div className='userHeader'>
      <p className='userNickname'>{profile.nickname
          ? profile.nickname
          : 'Guest'}</p>
      <p className='userRank'>{profile.nickname
          ? 'Game Master'
          : 'Cannon Fodder'}</p>
    </div>
    <div className='userBadges'>
      <div className={profile.nickname ? 'loginBadge badge1 badge' : 'badge1 badge'}>{profile.nickname ? '🙉 ': 'Badge1'}</div>
      <div className={profile.nickname ? 'loginBadge badge2 badge' : 'badge2 badge'}>{profile.nickname ? '😎': 'Badge2'}</div>
      <LoginContainer/>
    </div>
  </div>
);