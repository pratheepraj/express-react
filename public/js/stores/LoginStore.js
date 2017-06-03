import { ReduceStore } from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import LoginApiManager from '../api-managers/LoginApiManager';
import createHistory from 'history/createBrowserHistory';

const history = createHistory({
  forceRefresh: true,
});

class LoginStore extends ReduceStore {
  constructor () {
    super(AppDispatcher);
  }

  getInitialState () {
    return {};
  }

  reduce (state, action) {
    switch (action.type) {
      case 'auth/login':
        LoginApiManager.login(action.payload);
        return state;
      case 'auth/loginSuccess':
        history.push('/');
        return state;
      case 'auth/loginFailure':
        return state;
      default:
        return state;
    }
  }
}

export default new LoginStore();
