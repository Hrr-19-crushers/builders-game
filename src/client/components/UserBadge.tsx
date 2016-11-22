import * as React from 'react';

import LoginContainer from '../containers/LoginContainer';

export default ({profile}) => (
  <div className="userBadge">
    <img className="userBadgeProfile" src={profile.picture}></img>
    <p className="userNickname">{profile.nickname}</p>
    <LoginContainer />
  </div>
);