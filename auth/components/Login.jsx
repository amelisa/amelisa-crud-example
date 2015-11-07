import React from 'react';
import Base from './Base';
import { Card, Textfield, Button } from 'react-mdl';

class Login extends Base {

  render() {
    let { sending, error } = this.state;

    return (
      <Card className='form' shadowLevel={2}>
        <Textfield label='Email' type='email' ref='email' />
        <Textfield label='Password' type='password' ref='password' />
        <Button onClick={this.login.bind(this)} disabled={sending}>Login</Button>
        <span className='error'>{error}</span>
      </Card>
    );
  }

  login() {
    let email = this.refs.email.refs.input.value;
    let password = this.refs.password.refs.input.value;

    let data = {
      email,
      password
    }

    this.send(data, '/auth/login');
  }
}

Login.contextTypes = {
  model: React.PropTypes.object
};

export default Login;
