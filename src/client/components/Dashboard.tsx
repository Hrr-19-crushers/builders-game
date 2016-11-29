import * as React from 'react';

import UserActivityContainer from '../containers/UserActivityContainer';
import MessageTrafficContainer from '../containers/MessageTrafficContainer';
import ClientTrafficContainer from '../containers/ClientTrafficContainer';

export default() => (
  <div>
    <h1>Dashboard</h1>
    <UserActivityContainer />
    <MessageTrafficContainer />
    <ClientTrafficContainer />
  </div>
);