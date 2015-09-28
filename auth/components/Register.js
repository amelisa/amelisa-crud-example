import React from 'react';
import Base from './Base';

class Register extends Base {

  render() {
    let { sending, error } = this.state;

    return (
      <div>
        <input type='text' ref='email' />
        <input type='password' ref='password' />
        <input type='password' ref='confirm' />
        <button onClick={this.register.bind(this)} disabled={sending}>Register</button>
        {error}
      </div>
    );
  }

  register() {
    let email = this.refs.email.getDOMNode().value;
    let password = this.refs.password.getDOMNode().value;
    let confirm = this.refs.confirm.getDOMNode().value;

    let data = {
      email,
      password,
      confirm
    }

    this.send(data, '/auth/register');
  }
}

Register.contextTypes = {
  model: React.PropTypes.object
};

export default Register;
