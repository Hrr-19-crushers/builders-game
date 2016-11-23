import * as React from 'react';

import LoginContainer from '../containers/LoginContainer';

export default ({profile}) => (
  <div className="userBadge">
    <img 
      className="userBadgeProfile" 
      src={profile.nickname ? profile.picture : '../../assets/sprites/mario.png'}>
    </img>
    <p className="userNickname">{profile.nickname ? profile.nickname: 'Guest'}</p>
        <div id="boulder-badge">
          <div className="badge">
            <div className="part part-1"></div>
            <div className="part part-2"></div>
            <div className="part part-3"></div>
            <div className="part part-4"></div>
            <div className="part part-5"></div>
            <div className="part part-6"></div>
            <div className="part part-7"></div>
            <div className="part part-8"></div>
          </div>
          <h1>Cascade badge</h1>
        </div>
    <LoginContainer />
  </div>
);