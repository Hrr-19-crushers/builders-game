import * as React from 'react';

import teamData from './teamData';

export default() => {
  const profiles = teamData.map(mate => (
    <a href={mate.html_url}><div className='mate'>
      <h3>{mate.name}</h3>
      <h4>{mate.title}</h4>
      <img src={mate.avatar_url}></img>
      <span>City:&nbsp;{mate.city}</span>
      <span>Likes:&nbsp;{mate.likes}</span>
    </div></a>
  ));

  return (
    <div className='about'>
      <h2>The Game</h2>
      <p className='desc'>
        <span className='gameName'>We Play Perilous</span>
        &nbsp;was inspired by the success of&nbsp;
        <a href='https://www.twitch.tv/twitchplayspokemon'>Twitch plays Pokemon</a>
        &nbsp;and Hunter Loftis' talk entitled&nbsp;
        <a
          href='http://2014.jsconf.eu/speakers/hunter-loftis-we-will-all-be-game-programmers.html'>"We will all be game developers"</a>
        &nbsp;where he argues that web developers can apply the lessons pioneered by gaming in
        the areas of networking, state management, and physics-based animations to
        create immersive online experiences.</p>

      <p className='desc'>The technical goal of&nbsp;
        <span className='gameName'>We Play Perilous</span>
        &nbsp;was to create a synchronized player experience by efficiently managing state
        across multiple clients. Our team code style prefers strict typing, extensive
        use of ES6 features, and a functional programming paradigm. The app uses
        JavaScript for both the client app and the server.</p>

      <p className='desc'>
        Open source code available on&nbsp;
        <a href='https://github.com/Hrr-19-crushers/builders-game'>GitHub</a>.
      </p>

      <h2>The Stack</h2>
      <ul>
        <li>TypeScript</li>
        <li>React</li>
        <li>Redux</li>
        <li>Phaser</li>
        <li>Sass</li>
        <li>Webpack</li>
        <li>Express</li>
        <li>Redis</li>
      </ul>

      <h2>The Team</h2>
      <div className='profiles'>{profiles}</div>
    </div>
  );
}