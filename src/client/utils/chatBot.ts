import {chatBotAction} from '../actions/chatActions';
import store from '../store';

const botMessage = text => store.dispatch(chatBotAction(text || '🤖 is always listening'));

// TODO: how to get user state for name?
export const botWelcome = () => {
  const text = `Welcome to Perilous! Your incantations control our hero. Type '\\' followed by a command to play. For example '\\up' will move him up...`;
  botMessage(text);
  const text2 = `You can set your name by typing '\\name' followed by your name...`
  botMessage(text2);
  const text3 = `By the way I am Yoto, the demon assigned to your quest. Just call me with '\\help'!`;
  botMessage(text3);
};

export const botHelp = () => {
  const text = `responding to helpRequest`
  botMessage(text);
};

export const botStats = () => {
  // TODO: make reducer and endpoint to get stats
  //const text = getStats();
  const text = 'stats here';
  botMessage(text);
};

export const botSup = name => {
  botMessage(`Greetings ${name}! You bring much to our traveling party.`);
}

export const botNotFound = verb => {
  botMessage(`Sorry, I couldn't find the incantation ${verb}. Perhaps try again...`);
}

const advisments = [];