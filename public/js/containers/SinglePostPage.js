import React from 'react';
import { Container } from 'flux/utils';
import debounce from 'lodash/debounce';
import CommentActions from '../actions/CommentActions';
import CommentList from '../views/CommentList';
import CommentListStore from '../stores/CommentListStore';
import get from 'lodash/get';
import Post from '../views/Post';
import PostActions from '../actions/PostActions';
import PostStore from '../stores/PostStore';
import TopBar from '../views/TopBar';

class SinglePostPage extends React.Component {
  static getStores () {
    return [
      PostStore,
      CommentListStore,
    ];
  }

  static calculateState (prevState) {
    return {
      post: PostStore.getState(),
      comments: CommentListStore.getState(),
    };
  }

  render () {
    console.log('this.state.post.id', this.state.post.id);
    return (
      <div>
        <TopBar />
        <div className='row'>
          <div className='columns'>
            <Post data={this.state.post} />
            <CommentList
              postId={this.state.post._id}
              comments={this.state.comments} />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount () {
    debounce(() => {
      PostActions.startLoadPost(get(this.props, 'match.params.id'));
      CommentActions.startLoadComments(get(this.props, 'match.params.id'));
    }, 1)();
  }

  componentWillUnmount () {
    PostActions.unLoadPost();
    CommentActions.unLoadComments();
  }
}

export default Container.create(SinglePostPage);
