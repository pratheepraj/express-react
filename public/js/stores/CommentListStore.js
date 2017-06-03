import { ReduceStore } from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import clone from 'lodash/clone';
import get from 'lodash/get';
import CommentApiManager from '../api-managers/CommentApiManager';

class CommentListStore extends ReduceStore {
  constructor () {
    super(AppDispatcher);
  }

  getInitialState () {
    return [];
  }

  reduce (state, action) {
    let comments;

    switch (action.type) {
      case 'comments/start-load':
        CommentApiManager.getComments(action.payload);
        return state;
      case 'comments/load':
        return action.payload;
      case 'comments/unload':
        return {};
      case 'comment/create':
        CommentApiManager.postComment(action.payload);
        return state;
      case 'comment/add':
        comments = clone(state);
        comments.push(action.payload);
        return comments;
      case 'comment/delete':
        CommentApiManager.deleteComment(action.payload);
        return state;
      case 'comment/remove':
        comments = clone(state);
        comments = comments.filter((comment) => comment._id !== get(action.payload, '_id'));
        return comments;
      default:
        return state;
    }
  }
}

export default new CommentListStore();
