// List of all actions for the client redux store

/*CHATS*/
export const ADD_CHAT: String = 'ADD_CHAT';
export const CLEAR_CHATS: String = 'CLEAR_CHATS';
export const CHATS_AFTER: String = 'CHATS_AFTER'; // used to truncate chats after a certain time

/*USERS*/
export const CHANGE_USER: String = 'CHANGE_USER';

/*GAME-ACTIONS*/
export const NEXT_TURN: String = 'NEXT_TURN';
export const VOTE: String = 'VOTE';

export const OUTCOME: String = 'OUTCOME';
export const MOVE: String = 'MOVE';
export const UPDATE_CHAR: String = 'UPDATE_CHAR';

/*Auth0*/
/*____________________ DISPLAY THE LOCK AND LOGIN ______________________________________*/
export const LOCK_SUCCESS = 'LOCK_SUCCESS'
export const LOCK_FAIL = 'LOCK_FAIL'

/*____________________ LOG OUT ______________________________________*/
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAIL = 'LOGOUT_FAIL'


