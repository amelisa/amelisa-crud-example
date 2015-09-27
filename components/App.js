import React from 'react';
import { Link, RouteHandler } from 'react-router';
import { createContainer } from 'engine';
import Logout from './Logout';

class App extends React.Component {

  getQueries() {
    return {
      status: ['_model', 'status'],
      session: ['_auth', 'session']
    };
  }

  render() {
    let { status, session } = this.props;

    return (
      <div>
        <p>Online: {status.online ? 'Yes' : 'No'}</p>
        <p>Logged In: {session.loggedIn ? 'Yes' : 'No'}</p>
        <Link to='/'>List</Link>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
        <Logout />
        <RouteHandler />
      </div>
    )
  }
}

export default createContainer(App, React);
