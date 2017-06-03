import React from 'react';
import CommentActions from '../actions/CommentActions';

class Comment extends React.Component {
  render () {
    const { createdAt, body } = this.props.data;
    return (
      <tr>
        <td>{ createdAt }</td>
        <td>{ body }</td>
        <td>
          <button type='button' className='button alert' onClick={() => this.onDelete()}>
            Delete</button>
        </td>
      </tr>
    );
  }

  onDelete () {
    if (confirm('Are you sure you want to delete this comment?')) {
      CommentActions.deleteComment(this.props.data.id);
    }
  }
}

export default Comment;
