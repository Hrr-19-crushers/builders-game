import * as io from 'socket.io-client';

import { Action } from '../actions/actionInterface';
import store from '../store';
import { addChatAction, chatBotAction } from '../actions/chatActions';
import {
  nextTurnAction,
  voteAction, 
  outcomeAction,
  updateCharAction
} from '../actions/gameActions';


// connect to server socket

const socket = io();

/*OUTGOING TO SERVER */
export const chat2Server = message => {
  socket.emit('newMessage', message);
}

export const direction2Server = direction => {
  socket.emit('direction', direction);
}

export const vote2Server = (choice: string) => {
  socket.emit('vote', choice);
} 

export const newPlayer2Server = (name:string) => {
  socket.emit('newPlayer', name);
}

/* INCOMING FROM SERVER */
// TODO: broadcast message with user's name
socket.on('newPlayer', name => {
  console.log('new player', name);
  store.dispatch(chatBotAction(name + ' just joined the game!'));
});

/*MESSAGES */
// when client receives message from server update the store
socket.on('userMessage', message => {
  store.dispatch(addChatAction(message));
});

/*INCOMING FROM SERVER - GAME*/
socket.on('move', charState => {
  store.dispatch(updateCharAction(charState));
});

socket.on('vote', (choice: String) => {
  store.dispatch(voteAction(choice));
});

socket.on('nextTurn', (turn) => {
  store.dispatch(nextTurnAction(turn));
});

socket.on('outcome', (choice) => {
  store.dispatch(outcomeAction(choice));
});



//______________ auth0 helpers _____________________________________

import {
  lockSuccess,  
  lockFail,
  logoutRequest,
  logutSuccess
} from '../actions/authActions';
import Auth0Lock from 'auth0-lock';

export const isAuth = store.getState()['authReducer'].isAuth
export const {dispatch} = store;

const lock = new Auth0Lock('jYPMYlgiL8LUcwbOVQA2Oz0BlifZnPAn', 'hrr19crushers.auth0.com');

export const logIn =() => {    
    lock.show();
}

export const doAuth = () => { 
  lock.on('authenticated', (authResult) => {     
    lock.getProfile(authResult.idToken, (err, profile)=>{
      console.log(profile);    
      if (err) {return dispatch (lockFail(err))}
      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('id_token', authResult.idToken);
      dispatch(lockSuccess(profile, authResult.idToken))
    });
  });
}
doAuth();

export const logOut = () => {   
  dispatch(logoutRequest())
  localStorage.removeItem('id_token')
  localStorage.removeItem('profile')
  dispatch(logutSuccess())
}
