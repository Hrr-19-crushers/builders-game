import * as React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './App';
import Profile from './Profile';
import Dashboard from './Dashboard';

export default () => (
    <div>
        <Router history={browserHistory}>
            <Route path='/' component={App} />
            <Route path='/profile' component={Profile} />
            <Route path='/dashboard' component={Dashboard} />
        </Router>
    </div>
);