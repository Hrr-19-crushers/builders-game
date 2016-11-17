import * as React from 'react'; // this is the babel way
import { render } from 'react-dom';

import Root from './components/Root';
import { Provider } from 'react-redux';
import store from './store';

// using require to import npm module without type declarations
const { AppContainer } = require('react-hot-loader');

// Tell Typescript that there is a global variable called module - see below
declare var module: { hot: any };

const rootEl = document.getElementById('root');

// And render our App into it, inside the HMR App ontainer which handles the hot reloading
render(
    <AppContainer>
        <Provider store={store}>
            <Root />
        </Provider>
    </AppContainer>,
    rootEl
);

// Handle hot reloading requests from Webpack
if (module.hot) {
    module.hot.accept('./components/Root', () => {
        // If we receive a HMR request for our App container, then reload it using require (we can't do this dynamically with import)
        const NextApp = require('./components/Root').default;
        // And render it into the root element again
        render(
            <AppContainer>
                <Root />
            </AppContainer>,
            rootEl
        );
    });
}