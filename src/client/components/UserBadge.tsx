import * as React from 'react';

export default ({profile}) => (
  <div className="userBadge">
    <img className="userBadgeProfile" src={profile.picture}></img>
    <p className="userNickname">{profile.nickname}</p>
  </div>
);