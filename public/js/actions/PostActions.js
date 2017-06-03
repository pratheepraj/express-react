import AppDispatcher from '../dispatcher/AppDispatcher';

const PostActions = {
  // POST
  startLoadPost (id) {
    AppDispatcher.dispatch({
      type: 'post/start-load',
      payload: id,
    });
  },

  loadPost (post) {
    AppDispatcher.dispatch({
      type: 'post/load',
      payload: post,
    });
  },

  unLoadPost () {
    AppDispatcher.dispatch({
      type: 'post/unload',
    });
  },

  createPost (post) {
    AppDispatcher.dispatch({
      type: 'post/create',
      payload: post,
    });
  },

  createPostSuccess (newPost) {
    AppDispatcher.dispatch({
      type: 'post/create-success',
      payload: newPost,
    });
  },

  updatePost (post) {
    AppDispatcher.dispatch({
      type: 'post/update',
      payload: post,
    });
  },

  // POSTS
  startLoadPosts () {
    AppDispatcher.dispatch({
      type: 'posts/start-load',
    });
  },

  loadPosts (posts) {
    AppDispatcher.dispatch({
      type: 'posts/load',
      payload: posts,
    });
  },
};

export default PostActions;
