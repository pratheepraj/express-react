import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './containers/LoginPage';
import HomePage from './containers/HomePage';
import SinglePostPage from './containers/SinglePostPage';
import EditPostPage from './containers/EditPostPage';

class App extends React.Component {
  render () {
    return (
      <Router>
        <div>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/login' component={LoginPage} />
          <Switch>
            <Route exact path='/posts/new' component={EditPostPage} />
            <Route exact path='/posts/:id' component={SinglePostPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'));
