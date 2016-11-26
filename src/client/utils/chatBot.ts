import {chatBotAction} from '../actions/chatActions';
import store from '../store';

const botMessage = text => store.dispatch(chatBotAction(text || '🤖 is always listening'));

// TODO: how to get user state for name?
export const botWelcome = () => {
  const text = `Welcome to WPP! Type '\' followed by a command to play. For example '\up' will move the character up.`;
  botMessage(text);
};

export const botHelp = () => {
  const text = `responding to helpRequest`
  botMessage(text);
};

export const botStats = () => {
  // TODO: make reducer and endpoint to get stats
  const text = getStats();
  botMessage(text);
};