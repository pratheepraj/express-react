import React from 'react';
import { Container } from 'flux/utils';
import debounce from 'lodash/debounce';
import PostActions from '../actions/PostActions';
import PostListStore from '../stores/PostListStore';
import PostList from '../views/PostList';
import PageTitle from '../views/PageTitle';
import TopBar from '../views/TopBar';

class HomePage extends React.Component {
  static getStores () {
    return [
      PostListStore,
    ];
  }

  static calculateState (prevState) {
    return {
      posts: PostListStore.getState(),
    };
  }

  render () {
    return (
      <div>
        <TopBar />
        <div className='row'>
          <div className='columns'>
            <PageTitle value='Express React' />
            <PostList posts={this.state.posts} />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount () {
    debounce(PostActions.startLoadPosts, 1)();
  }
}

export default Container.create(HomePage);
