import React from 'react';
import { Container } from 'flux/utils';
import LoginStore from '../stores/LoginStore';
import Login from '../views/Login';
import PageTitle from '../views/PageTitle';
import TopBar from '../views/TopBar';

class HomePage extends React.Component {
  static getStores () {
    return [
      LoginStore,
    ];
  }

  static calculateState (prevState) {
    return {
      data: LoginStore.getState(),
    };
  }

  render () {
    return (
      <div>
        <TopBar />
        <div className='row'>
          <div className='columns'>
            <PageTitle value='Login' />
            <Login />
          </div>
        </div>
      </div>
    );
  }
}

export default Container.create(HomePage);
