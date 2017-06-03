import React from 'react';
import { Container } from 'flux/utils';
import PostStore from '../stores/PostStore';
import PageTitle from '../views/PageTitle';
import TopBar from '../views/TopBar';
import EditPost from '../views/EditPost';

class HomePage extends React.Component {
  static getStores () {
    return [
      PostStore,
    ];
  }

  static calculateState (prevState) {
    return {
      data: PostStore.getState(),
    };
  }

  render () {
    return (
      <div>
        <TopBar />
        <div className='row'>
          <div className='columns'>
            <PageTitle value='Create Post' />
            <EditPost success={this.state.data.success} />
          </div>
        </div>
      </div>
    );
  }
}

export default Container.create(HomePage);
