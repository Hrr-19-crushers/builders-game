import Auth0Lock from 'auth0-lock';

import {lockSuccess, lockFail, logoutRequest, logutSuccess} from '../actions/authActions';
import store from '../store';

const {dispatch} = store;

// TODO: should we move this somewhere?
const lock = new Auth0Lock('jYPMYlgiL8LUcwbOVQA2Oz0BlifZnPAn', 'hrr19crushers.auth0.com');

export const logIn = () => {
  lock.show();
}

export const logOut = () => {
  localStorage.removeItem('id_token')
  localStorage.removeItem('profile')
  dispatch(logutSuccess())
}

const doAuth = () => {
  lock.on('authenticated', (authResult) => {
    lock.getProfile(authResult.idToken, (err, profile) => {
      if (err) {
        console.error(err);
        return 
      }
      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('id_token', authResult.idToken);
      dispatch(lockSuccess(profile, authResult.idToken))
    });
  });
}

doAuth();