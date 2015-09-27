import React from 'react';
import { Link } from 'react-router';
import { createContainer } from 'engine';
import superagent from 'superagent';

class Login extends React.Component {

  getQueries() {
    return {
      session: ['_auth', 'session']
    };
  }

  render() {
    let { session } = this.props;

    return (
      <div>
        Login
        <div>
          <input type='text' ref='email' />
          <input type='password' ref='password' />
          <button onClick={this.login.bind(this)}>Login</button>
        </div>
      </div>
    );
  }

  login() {
    let email = this.refs.email.getDOMNode().value;
    let password = this.refs.password.getDOMNode().value;

    superagent
      .post('/auth/login')
      .send({email, password})
      .set('X-Requested-With', 'XMLHttpRequest')
      .end((err, res) => {
        console.log(err, res.body);
        if (!err && res.body.success) {
          this.context.model.set('_auth', 'session', 'loggedIn', true);
        }
      });
  }
}

Login.contextTypes = {
  model: React.PropTypes.object
};

export default createContainer(Login, React);
