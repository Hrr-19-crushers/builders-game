import { expect } from 'chai';
import { addChatAction } from '../../src/client/actions/chatActions';
import chatMiddleware from '../../src/client/utils/chatActionMiddleware';
import { CHANGE_USER } from '../../src/client/actions/actionTypes';

describe('chat middleware', () => {
  const next = () => 'next called';
  let store;
  let middleware;

  beforeEach(() => {
    store = {
      actions: [],
      dispatch: function (action) {
        this.actions.push(action)
      }
    };
    middleware = chatMiddleware(store)(next);
  });

  it('will pass through chats with no action operator (i.e. \\)', () => {
    const chat = addChatAction({ name: 'jon', text: 'hello world', date: new Date() });
    expect(middleware(chat)).to.equal('next called');
    expect(store.actions.length).to.equal(0);
  });

  it('will allow users to change their name', () => {
    const chat = addChatAction({ name: 'jon', text: '\\name raj', date: new Date() });
    expect(middleware(chat)).to.equal('next called');
    expect(store.actions[0].type).to.equal(CHANGE_USER);
    expect(store.actions[0].payload).to.equal('raj');
  });

  it('will allow users to send a direction', () => {
    const chat = addChatAction({ name: 'jon', text: '\\up', date: new Date() });
    expect(middleware(chat)).to.equal('next called');
    //TODO: mock server call
  });
})