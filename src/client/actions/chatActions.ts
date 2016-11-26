import {
  ADD_CHAT,
  CLEAR_CHATS,
  CHATS_AFTER
} from './actionTypes';

import { Message } from '../reducers/chatReducer';

import { Action } from './actionInterface';

export const addChatAction = (message: Message): Action => ({
  type: ADD_CHAT,
  payload: message
});

export const clearChatsAction = (): Action => ({ type: CLEAR_CHATS });

export const chatsAfterAction = (date: Date): Action => ({
  type: CHATS_AFTER,
  payload: date
});

export const chatBotAction = (text: string): Action => ({
  type: ADD_CHAT,
  payload: {
    user: '👹',
    text: text,
    type: 'admin',
    date: JSON.stringify(new Date())
  }
});