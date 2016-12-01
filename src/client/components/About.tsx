import * as React from 'react';

import data from './teamData';

export default() => (
  <div className='about'>
    <h2>The Game</h2>
    <p className='desc'><span className='gameName'>We Play Perilous</span> is a platform to play multiplayer games together on desktop and mobile. Currently, users can play <span className='gameName'>Perilous</span>, a multiplayer adventure game where user chats help the hero avoid enemies and collect treasure objects.</p> 
    
     <p className='desc'>This app was inspired by the success of
      <a href='https://www.twitch.tv/twitchplayspokemon'> Twitch plays Pokemon</a> and Hunter Loftis' talk entitled <a href='http://2014.jsconf.eu/speakers/hunter-loftis-we-will-all-be-game-programmers.html'>"We will all be game developers"</a>, where he argues that web developers can apply the lessons pioneered by gaming in the areas of networking, state management, and physics-based animations to create immersive online experiences.</p>

    <h2>The Stack</h2>
    <p className ='desc'>The technical goal of <span className='gameName'>We Play Perilous</span> was to create a synchronized experience by efficiently managing state across multiple clients. Our team code style prefers strict typing, extensive use of ES6 features, and a functional programming paradigm. The app uses JavaScript for both the client app and the server.</p>
    <p className='desc'><span className='gameName'>We Play Perilous</span> was created with:</p>
    <ul>
      <li>TypeScript</li>
      <li>React</li>
      <li>Redux</li>
      <li>Phaser</li>
      <li>Webpack</li>
      <li>Express</li>
      <li>Redis</li>
    </ul>
    <p className='desc'><span>Open source code available on </span>
      <a href='https://github.com/Hrr-19-crushers/builders-game'>GitHub</a>
    </p>
    <h2>The Team</h2>
  </div>
);