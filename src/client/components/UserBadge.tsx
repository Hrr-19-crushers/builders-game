import * as React from 'react';

import LoginContainer from '../containers/LoginContainer';

export default ({profile}) => (
  <div className="userBadge">
    <img 
      className="userBadgeProfile" 
      src={profile.nickname ? profile.picture : '../../assets/sprites/mario.png'}>
    </img>
    <p className="userNickname">{profile.nickname ? profile.nickname: 'Guest'}</p>
    <LoginContainer />
  </div>
);