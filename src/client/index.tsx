import * as React from 'react'; // this is the babel way
import { render } from 'react-dom';

import HelloWorld from './components/App';
import AnotherComp from './components/AnotherComponent';
// import sio from './utils/socket_io';
import Chat from './components/Chat';

// using require to import npm module without type declarations
const { AppContainer } = require('react-hot-loader');

// Tell Typescript that there is a global variable called module - see below
declare var module: { hot: any };

const rootEl = document.getElementById('root');

// And render our App into it, inside the HMR App ontainer which handles the hot reloading
render(
    <AppContainer>
        <Chat />
    </AppContainer>,
    rootEl
);

// Handle hot reloading requests from Webpack
if (module.hot) {
    module.hot.accept('./components/Chat', () => {
        // If we receive a HMR request for our App container, then reload it using require (we can't do this dynamically with import)
        const NextApp = require('./components/Chat').default;
        // And render it into the root element again
        render(
            <AppContainer>
                <Chat />
            </AppContainer>,
            rootEl
        );
    });
}