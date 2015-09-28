import React from 'react';
import Base from './Base';

class Login extends Base {

  constructor() {
    super();
  }

  getQueries() {
    return {
      session: ['_auth', 'session']
    };
  }

  render() {
    let { session } = this.props;
    let { sending, error } = this.state;

    return (
      <div>
        <input type='text' ref='email' />
        <input type='password' ref='password' />
        <button onClick={this.login.bind(this)} disabled={sending}>Login</button>
        {error}
      </div>
    );
  }

  login() {
    let email = this.refs.email.getDOMNode().value;
    let password = this.refs.password.getDOMNode().value;

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
