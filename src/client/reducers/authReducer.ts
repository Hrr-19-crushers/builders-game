import {
  LOCK_SUCCESS,
  LOGOUT_SUCCESS,
} from '../actions/actionTypes';

export interface Auth {
  isFetching: boolean;
  isAuth: boolean;
  profile: any;
  err?: any
}

const INITAL_STATE: Auth = {
  isFetching: false,
  isAuth: localStorage.getItem('id_token')? true : false,
  profile: {name:'Guest'}
};

export const authReducer = (state: Auth = INITAL_STATE, action) => {
  switch (action.type){
    case LOCK_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuth: true,
        profile: JSON.parse(action.profile),
      })
    case LOGOUT_SUCCESS:
    console.log('testing if im in the reducer file')
      return Object.assign({}, state, {
        isFetching: true,
        isAuth: false,
        profile: {name:'Guest'}
      })
    default: 
      return state;      
  }
}