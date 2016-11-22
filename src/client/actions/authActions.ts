import {
  LOCK_SUCCESS,
  LOCK_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL
} from './actionTypes'

export const lockSuccess = (profile, token) => ({ 
  type: LOCK_SUCCESS,
  profile,
  token
});

export const lockFail = (err) => ({
  type: LOCK_FAIL,
  err
});


export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
  isFetching: true,
  isAuth: true
  
});

export const logutSuccess = () => ({
  type: LOGOUT_SUCCESS,
  isFetching: false,
  isAuth: false
});

