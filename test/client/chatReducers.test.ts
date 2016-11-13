import { expect } from 'chai';

// reducers
import {
  Message,
  ChatState,
  chatReducer
} from '../../src/client/reducers/chatReducers';

// action types
import {
  ADD_CHAT,
  CLEAR_CHATS,
  CHATS_AFTER
} from '../../src/client/actions/actionTypes';

// action creators
import {
  addChatAction,
  clearChatsAction,
  chatsAfterAction
} from '../../src/client/actions/chatActions';

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
    },
    {
      name: 'Tom',
      text: 'new message',
      type: 'chat',
      date: new Date()
    }
  ];
  beforeEach(() => {

  });

  it('can add a chat to the list', () => {
    const nextState = chatReducer(INITIAL_STATE, { type: ADD_CHAT, payload: Chats[0] });
    expect(nextState).to.eql({
      messages: [Chats[0]]
    });
  });

  it('can clear old chats from the list', () => {
    let state = chatReducer(INITIAL_STATE, { type: ADD_CHAT, payload: Chats[0] });
    state = chatReducer(state, { type: ADD_CHAT, payload: Chats[1] });
    const nextState = chatReducer(state, removeC({ name: 'Silas' }));
    expect(nextState.messages.length).to.equal(1);
    expect(nextState.messages[0].name).to.equal('Tom');
  });
});