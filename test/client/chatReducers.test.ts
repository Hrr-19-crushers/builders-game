import { expect } from 'chai';

import {
  Message,
  ChatState,
  addChat
} from '../../src/client/reducers/chatReducers';

import {
  ADD_CHAT,
  CLEAR_CHATS,
  CHATS_AFTER
} from '../../src/client/actions/actionTypes';

describe('chat reducer functions', () => {
  const INITIAL_STATE: ChatState = {
    messages: []
  };
  let Chats: Message[] = [
    {
      name: 'Silas',
      text: 'message',
      type: 'chat',
      date: new Date()
    }
  ];
  beforeEach(() => {

  });

  it('can add a chat to the list', () => {
    const nextState = addChat(INITIAL_STATE, { type: ADD_CHAT, payload: Chats[0] });
    expect(nextState).to.eql({
      messages: [Chats[0]]
    });
  });
});