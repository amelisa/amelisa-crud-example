import React from 'react';
import { Link } from 'react-router';
import { createContainer } from 'engine';
import superagent from 'superagent';

class Register extends React.Component {

  getQueries() {
    return {
      session: ['_auth', 'session']
    };
  }

  render() {
    let { session } = this.props;

    return (
      <div>
        Register
        <div>
          <input type='text' ref='email' />
          <input type='password' ref='password' />
          <input type='password' ref='confirm' />
          <button onClick={this.register.bind(this)}>Register</button>
        </div>
      </div>
    );
  }

  register() {
    let email = this.refs.email.getDOMNode().value;
    let password = this.refs.password.getDOMNode().value;
    let confirm = this.refs.confirm.getDOMNode().value;

    superagent
      .post('/auth/register')
      .send({email, password, confirm})
      .set('X-Requested-With', 'XMLHttpRequest')
      .end((err, res) => {
        console.log(err, res.body);
        if (!err && res.body.success) {
          this.context.model.set('_auth', 'session', 'loggedIn', true);
        }
      });
  }
}

Register.contextTypes = {
  model: React.PropTypes.object
};

export default createContainer(Register, React);
