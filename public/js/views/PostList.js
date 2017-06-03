import React from 'react';
import {Link} from 'react-router-dom';
import get from 'lodash/get';

class PostList extends React.Component {
  render () {
    let posts;

    if (get(this, 'props.posts', []).length) {
      posts = this.props.posts.map(post =>
        <li key={post._id}>
          <Link to={`/posts/${post._id}`}>{post.title}</Link>
        </li>
      );
    }

    return <ol>{posts}</ol>;
  }
}

export default PostList;
