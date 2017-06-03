import axios from 'axios';
import API from '../constants/Api';
import PostActions from '../actions/PostActions';

const PostAPIManager = {
  getPosts () {
    axios.get(API.POSTS).then((response) => {
      PostActions.loadPosts(response.data.data);
    });
  },

  getPost (id) {
    axios.get(`${API.POSTS}/${id}`).then((response) => {
      PostActions.loadPost(response.data);
    });
  },

  postPost (data) {
    axios.post(API.POSTS, data).then((response) => {
      PostActions.createPostSuccess(response.data);
    });
  },
};

export default PostAPIManager;
