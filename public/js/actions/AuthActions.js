import AppDispatcher from '../dispatcher/AppDispatcher';

const AuthActions = {
  login (data) { // data: Object
    AppDispatcher.dispatch({
      type: 'auth/login',
      payload: data,
    });
  },

  loginSuccess (loggedInUser) { // loggedInUser: Object
    AppDispatcher.dispatch({
      type: 'auth/loginSuccess',
      payload: loggedInUser,
    });
  },

  loginFailure () {
    AppDispatcher.dispatch({
      type: 'auth/loginFailure',
    });
  },

  register (data) { // data: Object
    AppDispatcher.dispatch({
      type: 'auth/register',
      payload: data,
    });
  },

  registerSuccess (newUser) { // newUser: Object
    AppDispatcher.dispatch({
      type: 'auth/registerSuccess',
      payload: newUser,
    });
  },

  registerFailure () {
    AppDispatcher.dispatch({
      type: 'auth/registerFailure',
    });
  },
};

export default AuthActions;
