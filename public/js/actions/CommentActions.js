import AppDispatcher from '../dispatcher/AppDispatcher';

const CommentActions = {
  startLoadComments (postId) {
    AppDispatcher.dispatch({
      type: 'comments/start-load',
      payload: postId,
    });
  },

  loadComments (comments) {
    AppDispatcher.dispatch({
      type: 'comments/load',
      payload: comments,
    });
  },

  unLoadComments () {
    AppDispatcher.dispatch({
      type: 'comments/unload',
    });
  },

  createComment (comment) {
    AppDispatcher.dispatch({
      type: 'comment/create',
      payload: comment,
    });
  },

  addComment (comment) {
    AppDispatcher.dispatch({
      type: 'comment/add',
      payload: comment,
    });
  },

  deleteComment (id) {
    AppDispatcher.dispatch({
      type: 'comment/delete',
      payload: id,
    });
  },

  removeComment (id) {
    AppDispatcher.dispatch({
      type: 'comment/remove',
      payload: id,
    });
  },
};

export default CommentActions;
