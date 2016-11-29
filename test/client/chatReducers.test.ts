import { expect } from 'chai';

// reducers
import {
  Message,
  ChatState,
  chatReducer
} from '../../src/client/reducers/chatReducer';

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
      user: 'Silas',
      text: 'message',
      type: 'chat',
      date: JSON.stringify(new Date('January 1, 2016'))
    },
    {
      user: 'Tom',
      text: 'new message',
      type: 'chat',
      date: JSON.stringify(new Date('March 1, 2016'))
    }
  ];
  beforeEach(() => {

  });

  it('can add a chat to the list', () => {
    const nextState = chatReducer(INITIAL_STATE, addChatAction(Chats[0]));
    expect(nextState).to.eql({
      messages: [Chats[0]]
    });
  });

  it('can clear all chats from list', () => {
    const state = chatReducer(INITIAL_STATE, addChatAction(Chats[0]));
    const nextState = chatReducer(INITIAL_STATE, clearChatsAction());
    expect(nextState.messages).to.eql([]);
  });

  //not currently using this functionality
  // it('can clear chats before a certain date from the list', () => {
  //   let state = chatReducer(INITIAL_STATE, addChatAction(Chats[0]));
  //   state = chatReducer(state, addChatAction(Chats[1]));
  //   const nextState = chatReducer(state, chatsAfterAction(new Date('Febuary 1, 2016')));
  //   expect(nextState.messages.length).to.equal(1);
  //   expect(nextState.messages[0].user).to.equal('Tom');
  // });
});