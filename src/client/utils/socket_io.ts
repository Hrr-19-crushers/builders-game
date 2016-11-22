import * as io from 'socket.io-client';

import { Action } from '../actions/actionInterface';
import store from '../store';
import { addChatAction } from '../actions/chatActions';
import {
  nextTurnAction,
  voteAction,
  outcomeAction,
  updateCharAction
} from '../actions/gameActions';


// connect to server socket
const socket = io();

// TODO: broadcast message with user's name
socket.on('newPlayer', () => {
  console.log('a new player joined');
});

/*MESSAGES */
// when client receives message from server update the store
socket.on('userMessage', message => {
  store.dispatch(addChatAction(message));
});

socket.on('prompt', (data) => {
  console.log(data);
  if (data.question) {
    alert(data.question);
  };
});

export const chat2Server = message => {
  socket.emit('newMessage', message);
}

export const direction2Server = direction => {
  socket.emit('direction', direction);
}

/*GAME*/
socket.on('move', charState => {
  console.log('move', charState);
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


const lock = new Auth0Lock(, );

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
