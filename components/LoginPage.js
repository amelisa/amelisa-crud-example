import React from 'react';
import { Login, Logout, Register } from '../auth/components';

class LoginPage extends React.Component {

  render() {
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

export default LoginPage;
