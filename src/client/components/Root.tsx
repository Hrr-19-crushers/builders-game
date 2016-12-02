import * as React from 'react';
import {IndexRoute, Route, Router, browserHistory} from 'react-router';

import About from './About';
import App from './App';
import Dashboard from './Dashboard';
import Main from './Main';

export default () => (
  <div>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Main}/>
        <Route path='/about' component={About}/>
        <Route path='/dashboard' component={Dashboard}/>
      </Route>
    </Router>
  </div>
);
