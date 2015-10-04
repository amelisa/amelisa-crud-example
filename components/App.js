import React from 'react';
import { Link, RouteHandler } from 'react-router';
import { createContainer } from 'engine';

class App extends React.Component {

  getQueries() {
    let { userId } = this.context.model.get('_session');

    return {
      session: ['_session', {}],
      user: ['users', userId]
    };
  }

  render() {
    let { session, user } = this.props;
    console.log('App render', user)

    return (
      <div>
        <p>Online: {session.online ? 'Yes' : 'No'}</p>
        <p>Logged In: {session.loggedIn ? 'Yes ' + user.email : 'No'}</p>
        <Link to='/'>List</Link>
        <Link to='/login'>Login</Link>
        <RouteHandler />
      </div>
    )
  }
}

App.contextTypes = {
  model: React.PropTypes.object
};

export default createContainer(App, React);
