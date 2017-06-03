import { ReduceStore } from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import PostApiManager from '../api-managers/PostApiManager';

class PostListStore extends ReduceStore {
  constructor () {
    super(AppDispatcher);
  }

  getInitialState () {
    return [];
  }

  reduce (state, action) {
    switch (action.type) {
      case 'posts/load':
        return action.payload;
      case 'posts/start-load':
        PostApiManager.getPosts();
        return state;
      default:
        return state;
    }
  }
}

export default new PostListStore();
