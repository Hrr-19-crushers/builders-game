import * as React from 'react';

import InputContainer from '../containers/InputContainer';
import MessagesContainer from '../containers/MessagesContainer';
import UserMenuContainer from '../containers/UserMenuContainer';

export default () => (
  <div className='chatBox'>
    <UserMenuContainer />
    <MessagesContainer />
    <InputContainer />
  </div>
);