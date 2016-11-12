/// <reference path="../../../type-declarations/Object.d.ts" />
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

const INITIAL_STATE: ChatState = { messages: [] };

export const addChat = (state: ChatState = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case ADD_CHAT:
      return Object.assign(state, { messages: [...state.messages, action.payload] });
    default:
      return state;
  }
};