import React from 'react';
import CommentActions from '../actions/CommentActions';
import get from 'lodash/get';

class CommentBox extends React.Component {
  constructor () {
    super();

    this.state = {
      value: get(this, 'props.value'),
    };
  }

  render () {
    return (
      <div>
        <textarea name='' id='' rows='10' value={this.state.value}
          onChange={(evt) => this.onChange(evt)} />
        <button type='button' className='button' onClick={() => this.onSubmit()}>Add</button>
      </div>
    );
  }

  onChange (evt) {
    this.setState({value: evt.target.value});
  }

  onSubmit () {
    CommentActions.createComment({
      body: this.state.value,
      postId: this.props.postId,
    });
  }
}

export default CommentBox;
