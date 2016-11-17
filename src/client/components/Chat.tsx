import * as React from 'react';

import InputContainer from '../containers/InputContainer';
import MessagesContainer from '../containers/MessagesContainer';
import UserMenuContainer from '../containers/UserMenuContainer';
import TurnDisplayContainer from '../containers/TurnDisplayContainer';

export default () => (
  <div className='chatBox'>
    <UserMenuContainer />
    <TurnDisplayContainer />
    <MessagesContainer />
    <InputContainer />
  </div>
);