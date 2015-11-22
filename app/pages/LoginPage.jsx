import React from 'react';
import { Login, Logout, Register } from '../../auth/components';
import { Card, Textfield } from 'react-mdl';

class LoginPage extends React.Component {

  static contextTypes = {
    model: React.PropTypes.object
  }

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

export default LoginPage;
