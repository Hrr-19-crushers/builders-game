import React from 'react';
import {render} from 'react-dom';

import HelloWorld from './components/react';

const forty: number = 42;

// using require to import npm module without type declarations
const { AppContainer } = require('react-hot-loader');

// Tell Typescript that there is a global variable called module - see below
declare var module: { hot: any };

const rootEl = document.getElementById('app');

//And render our App into it, inside the HMR App ontainer which handles the hot reloading
render(
  <AppContainer>
    <HelloWorld />
  </AppContainer>,
  rootEl
);

// // // Handle hot reloading requests from Webpack
if (module.hot) {
  module.hot.accept('./containers/App', () => {
    // If we receive a HMR request for our App container, then reload it using require (we can't do this dynamically with import)
    const NextApp = require('./containers/App').default;

    // And render it into the root element again
    render(
        <AppContainer>
         <NextApp />
      </AppContainer>,
      rootEl
    );
  })
}