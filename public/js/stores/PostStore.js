import { ReduceStore } from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import PostApiManager from '../api-managers/PostApiManager';

class PostStore extends ReduceStore {
  constructor () {
    super(AppDispatcher);
  }

  getInitialState () {
    return {};
  }

  reduce (state, action) {
    switch (action.type) {
      case 'post/start-load':
        PostApiManager.getPost(action.payload);
        return state;
      case 'post/load':
        return action.payload;
      case 'post/unload':
        return {};
      case 'post/create':
        PostApiManager.postPost(action.payload);
        return state;
      case 'post/create-success':
        action.payload.success = true;
        return action.payload;
      case 'post/update':
        return action.payload;
      default:
        return state;
    }
  }
}

export default new PostStore();
