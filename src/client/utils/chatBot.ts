import {chatBotAction} from '../actions/chatActions';
import store from '../store';

export const botMessage = text => store.dispatch(chatBotAction(text || '🤖 is always listening'));

const grumblings = [
  'Hrrmmmm.  What\'s that who are you?!',
  'Look at my works and despair! Oh wait you\'re not impressed...',
  'Zzzzzz....Hey! Can\'t a demon get his sleep?'
];
const advisements = [
  'You\'re seeking the 8 objects of the tri-force, They look valuable.',
  'The journey is long, but... well trying to think of a bright side to this',
  'I used to be a demon king, but led an insurrection against the gods.  That\'s a long story.',
  'Avoid the enemies.  They may look harmless but if you have no health you have nothing.',
  'Yoto needs to nap.  Go away now.'
];

export const botWelcome = () => {
  const greeting = grumblings[Math.floor(Math.random() * grumblings.length)];
  botMessage(greeting);
  const text = `Erm...welcome to Perilous! Your incantations control our hero. Type '\\' followed by a command to play. For example '\\up' will move him up...`;
  botMessage(text);
  const text2 = `You can set your name by typing '\\name' followed by your name...`
  botMessage(text2);
  const text3 = `By the way I am Yoto, the demon assigned to your quest. Just call me with '\\help'!`;
  botMessage(text3);
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

export const botAdvise = () => {
  botMessage(advisements[Math.floor(advisements.length * Math.random())]);
}