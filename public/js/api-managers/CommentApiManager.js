import axios from 'axios';
import API from '../constants/Api';
import CommentActions from '../actions/CommentActions';

const CommentAPIManager = {
  getComments (postId) {
    axios.get(`${API.POSTS}/${postId}/comments`).then((response) => {
      CommentActions.loadComments(response.data.data);
    });
  },

  postComment (data) {
    axios.post(API.COMMENTS, data).then((response) => {
      CommentActions.addComment(response.data);
    });
  },

  deleteComment (id) {
    axios.delete(`${API.COMMENTS}/${id}`).then((response) => {
      CommentActions.removeComment(response.data);
    });
  },
};

export default CommentAPIManager;
