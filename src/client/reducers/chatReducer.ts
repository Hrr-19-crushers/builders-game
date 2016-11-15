/// <reference path="../../../type-declarations/Object.d.ts" />
import * as Redux from 'redux';
import {
  ADD_CHAT,
  CLEAR_CHATS,
  CHATS_AFTER
} from '../actions/actionTypes';

import { Action } from '../actions/actionInterface';

export interface Message {
  name: String;
  text: String;
  type?: String;
  date: Date;
}

export interface ChatState {
  messages: Message[];
}

const INITIAL_STATE: ChatState = {
  messages: []
};

export const chatReducer = (state: ChatState = INITIAL_STATE, action: Action): ChatState => {
  switch (action.type) {
    case ADD_CHAT:
      return Object.assign({}, state, { messages: [...state.messages, action.payload] });
    case CLEAR_CHATS:
      return Object.assign({}, state, { messages: [] });
    case CHATS_AFTER:
      const recents = state.messages.filter(msg => msg.date > action.payload);
      return Object.assign({}, state, { messages: [...recents] });
    default:
      return state;
  }
};