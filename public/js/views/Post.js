import React from 'react';
import PageTitle from './PageTitle';

class Post extends React.Component {
  render () {
    const { title, body } = this.props.data;
    return (
      <div>
        <PageTitle value={title} />
        <p>{body}</p>
      </div>
    );
  }
}

export default Post;
