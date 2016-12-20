# We Play Perilous is deployed at: [https://builder-game.herokuapp.com/](https://builder-game.herokuapp.com/)

![](https://www.giphy.com/gifs/3o7TKEgxA6q5yzgAfu/giphy.gif)

## Description:
While obstensibly a game, We Play Perilous is a platform that allows multiple users to collaborate in situations akin to gaming.  We Play Perilous currently serves a multiplayer game where users control the hero using chat.

We Play Perilous was inspired by the success of [Twitch plays Pokemon](https://www.twitch.tv/twitchplayspokemon) and Hunter Loftis' talk entitled ["We will all be game developers"](http://2014.jsconf.eu/speakers/hunter-loftis-we-will-all-be-game-programmers.html) where he argues that web developers can apply the lessons pioneered by gaming in the areas of networking, state management, and physics-based animations to create immersive online experiences.

The technical goal of We Play Perilous was to create a synchronized player experience by efficiently managing state across multiple clients. Our team code style prefers strict typing, extensive use of ES6 features, and a functional programming paradigm. The app uses JavaScript for both the client app and the server.

## Technology:
We Play Perilous uses:
* TypeScript
* React
* Redux
* Phaser
* Sass
* Webpack
* Express
* Redis

## Instructions for running this repo:
To run this app on your local machine use the following commands:
1. `npm install` to install dependencies
2. `npm run watch-server` to compile the server using tsc and watch for changes
3. `npm run watch-client` to combile bundle client JavaScript and scss files using webpack and watch for changes
4. `npm start`: to start the production server at build/server/server.js.  You need to wait for the above build processes to run prior to starting your server.  This command uses nodemon which you can install with `npm i -g nodemon`.  If you prefer to run without nodemon, you can manually start the server with `node build/server/server.js`.
5. `npm run dev-server`: this will serve the bundled client files using webpack-dev-server.  
If you’re just working on the server side you don’t need this, but if you’re working on the 
client it gives allows you to have Hot Module Reloading (which is useful for React development). In production, the webpage and api info will be served from the same server, but in development we use a seperate WDS to allow HMR.
6. The app will now be available on http://localhost:1337 and http://localhost:3001 (dev server instance)

## MIT License:
The MIT License (MIT)
Copyright (c) 2016 Jonathan Deng, Mitch Small, Andrew Cernek, David Bisrat

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
