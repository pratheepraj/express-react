import React from 'react';
import { Link } from 'react-router-dom';

class TopBar extends React.Component {
  render () {
    return (
      <div className='top-bar'>
        <div className='row'>
          <div className='columns'>
            <div className='top-bar-left'>
              <ul className='menu'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/posts/new'>New Post</Link></li>
              </ul>
            </div>
            <div className='top-bar-right'>
              <ul className='menu'>
                <li><Link to='/login'>Login</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TopBar;
