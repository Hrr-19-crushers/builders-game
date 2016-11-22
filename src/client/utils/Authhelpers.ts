// import {
//   lockFail,
//   logoutRequest,
//   logutSuccess
// } from '../actions/authActions';
// import store from '../store';
// import Auth0Lock from 'auth0-lock';

// export const isAuth = store.getState()['authreducer'].isAuth;
// const {dispatch} = store;
// const lock = new Auth0Lock('jYPMYlgiL8LUcwbOVQA2Oz0BlifZnPAn', 'hrr19crushers.auth0.com');

// export const logIn =() =>{
//   console.log('hello')
//    lock.show()
//     doAuth(dispatch);
//  }


// export const doAuth = (dispatch) => {
//     lock.on('authenticated', (authResult) => {
//       lock.getProfile(authResult.idToken, (err, profile)=>{
//         console.log(profile);
//         if (err) {return dispatch (lockFail(err))}
//         localStorage.setItem('profile', JSON.stringify(profile));
//         localStorage.setItem('id_token', authResult.idToken);
//       });
//     });
//   }

// export const logOut = () => {
//     dispatch(logoutRequest())
//     localStorage.removeItem('id_token')
//     dispatch(logutSuccess())
//   }
