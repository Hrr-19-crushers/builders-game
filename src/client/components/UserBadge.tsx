import * as React from 'react';

import LoginContainer from '../containers/LoginContainer';

export default({profile}) => (
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
      <div className={profile.nickname ? 'loggedInBadge' : 'badge'}></div>
      <div className={profile.nickname ? 'loggedInBadge' : 'badge'}></div>
      <div className={profile.nickname ? 'loggedInBadge' : 'badge'}></div>
          <LoginContainer/>
    </div>
  </div>
);