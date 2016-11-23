// List of all actions for the client redux store
"use strict";
/*CHATS*/
exports.ADD_CHAT = 'ADD_CHAT';
exports.CLEAR_CHATS = 'CLEAR_CHATS';
exports.CHATS_AFTER = 'CHATS_AFTER'; // used to truncate chats after a certain time
/*USERS*/
exports.CHANGE_USER = 'CHANGE_USER';
/*GAME-ACTIONS*/
exports.UPDATE_BOARD = 'UPDATE_BOARD';
exports.NEXT_TURN = 'NEXT_TURN';
exports.VOTE = 'VOTE';
exports.OUTCOME = 'OUTCOME';
exports.MOVE = 'MOVE';
exports.UPDATE_CHAR = 'UPDATE_CHAR';
/*Auth0*/
/*____________________ DISPLAY THE LOCK AND LOGIN ______________________________________*/
exports.LOCK_SUCCESS = 'LOCK_SUCCESS';
exports.LOCK_FAIL = 'LOCK_FAIL';
/*____________________ LOG OUT ______________________________________*/
exports.LOGOUT_REQUEST = 'LOGOUT_REQUEST';
exports.LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
exports.LOGOUT_FAIL = 'LOGOUT_FAIL';
//# sourceMappingURL=actionTypes.js.map