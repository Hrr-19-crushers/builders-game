import * as React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import App from './App';
import About from './About';
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