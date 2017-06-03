import React from 'react';
import AuthActions from '../actions/AuthActions';

class Login extends React.Component {
  constructor () {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

  render () {
    return (
      <form onSubmit={(evt) => this.onSubmit(evt)}>
        <div>
          <label>Email</label>
          <input name='email' type='text'
            onChange={(evt) => this.onChange(evt, 'email')} value={this.state.email} />
        </div>
        <div>
          <label>Password</label>
          <input name='password' type='text'
            onChange={(evt) => this.onChange(evt, 'password')} value={this.state.password} />
        </div>
        <div>
          <button className='button'>Login</button>
        </div>
      </form>
    );
  }

  onChange (evt, field) {
    this.setState({[field]: evt.target.value});
  }

  onSubmit (evt) {
    evt.preventDefault();
    AuthActions.login(this.state);
  }
}

export default Login;
