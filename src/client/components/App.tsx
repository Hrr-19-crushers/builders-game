import * as React from 'react';

import ChatContainer from '../containers/ChatContainer';
import MessagesContainer from '../containers/MessagesContainer';
const App = () => (
  <div>
    <MessagesContainer />
    <ChatContainer />
  </div>
);

export default App;