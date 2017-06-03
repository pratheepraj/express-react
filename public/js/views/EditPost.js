import React from 'react';
import PostActions from '../actions/PostActions';
import {Redirect} from 'react-router-dom';

class EditPost extends React.Component {
  constructor () {
    super();

    this.state = {
      title: '',
      body: '',
      imageFile: '',
      previewImageUrl: '',
    };
  }

  render () {
    let previewImage = this.state.previewImageUrl
      ? <div><img width='400' src={this.state.previewImageUrl} /></div> : '';

    return (
      <div>
        <form onSubmit={(evt) => this.onSubmit(evt)}>
          <div>
            <label>Title</label>
            <input name='title' type='text'
              onChange={(evt) => this.onChange(evt, 'title')} value={this.state.title} />
          </div>
          <div>
            <label>Body</label>
            <textarea name='body' id='' rows='10'
              onChange={(evt) => this.onChange(evt, 'body')} value={this.state.body} />
          </div>
          <div>
            {previewImage}
            <input name='image' type='file' id='image-field' className='show-for-sr'
              onChange={(evt) => this.onImageChange(evt)} />
            <label htmlFor='image-field' className='button secondary'>Upload Image</label>
          </div>
          <div className='text-right'>
            <button className='button'>Create</button>
          </div>
        </form>
        {this.props.success && <Redirect to={'/'} />}
      </div>
    );
  }

  onChange (evt, field) {
    this.setState({[field]: evt.target.value});
  }

  onImageChange (evt) {
    evt.preventDefault();
    let reader = new FileReader();
    let file = evt.target.files[0];

    reader.onloadend = () => {
      this.setState({
        imageFile: file,
        previewImageUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  onSubmit (evt) {
    evt.preventDefault();
    let data;

    if (this.state.imageFile) {
      data = new FormData();
      data.append('imageFile', this.state.imageFile);
      data.append('title', this.state.title);
      data.append('body', this.state.body);
    } else {
      data = {
        title: this.state.title,
        body: this.state.body,
      };
    }

    PostActions.createPost(data);
  }
}

export default EditPost;
