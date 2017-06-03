import React from 'react';
import get from 'lodash/get';
import Comment from './Comment';
import CommentBox from './CommentBox';

class CommentList extends React.Component {
  render () {
    let comments;

    if (get(this, 'props.comments', []).length) {
      comments = this.props.comments.map(comment =>
        <Comment
          key={comment._id}
          data={comment} />
      );
    }

    return (
      <div style={{marginTop: '50px'}}>
        <table className='unstriped'>
          <thead>
            <tr>
              <th width='200'>Date Created</th>
              <th>Comment</th>
              <th width='100'>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {comments}
          </tbody>
        </table>
        <CommentBox postId={this.props.postId} />
      </div>
    );
  }
}

export default CommentList;
