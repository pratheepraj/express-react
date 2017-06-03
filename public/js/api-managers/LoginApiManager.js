import axios from 'axios';
import API from '../constants/Api';
import AuthActions from '../actions/AuthActions';

const LoginAPIManager = {
  login (data) {
    axios.post(API.LOGIN, data).then((response) => {
      AuthActions.loginSuccess(response.data);
    }).catch((response) => {
      AuthActions.loginFailure();
    });
  },
};

export default LoginAPIManager;
