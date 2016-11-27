// List of all actions for the client redux store

/*CHATS*/
export const ADD_CHAT: string = 'ADD_CHAT';
export const CLEAR_CHATS: string = 'CLEAR_CHATS';
export const CHATS_AFTER: string = 'CHATS_AFTER'; // used to truncate chats after a certain time

/*USERS*/
export const CHANGE_USER: string = 'CHANGE_USER';

/*GAME-ACTIONS*/
export const UPDATE_BOARD: string = 'UPDATE_BOARD';
export const NEXT_TURN: string = 'NEXT_TURN';
export const VOTE: string = 'VOTE';

export const OUTCOME: string = 'OUTCOME';
export const MOVE: string = 'MOVE';
export const UPDATE_CHAR: string = 'UPDATE_CHAR';

/*Auth0*/
/*____________________ DISPLAY THE LOCK AND LOGIN ______________________________________*/
export const LOCK_SUCCESS = 'LOCK_SUCCESS'
export const LOCK_FAIL = 'LOCK_FAIL'

/*____________________ LOG OUT ______________________________________*/
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAIL = 'LOGOUT_FAIL'

/*STATS*/
export const UPDATE_CLIENTS = 'UPDATE_CLIENTS';
