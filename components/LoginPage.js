import React from 'react';
import { createContainer } from 'engine';
import { Login, Logout, Register } from '../auth/components';

class LoginPage extends React.Component {

  getQueries() {
    return {
      session: ['_session']
    };
  }

  render() {
    let { session } = this.props;

    return (
      <div>
        <Login />
        <Logout />
        <Register />
      </div>
    );
  }
}

LoginPage.contextTypes = {
  model: React.PropTypes.object
};

export default createContainer(LoginPage, React);
