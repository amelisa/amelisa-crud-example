import React from 'react';
import { Login, Logout, Register } from '../../auth/components';
import { Card, Textfield } from 'react-mdl';

class LoginPage extends React.Component {

  render() {
    return (
      <div className='page-content'>
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
