import React from 'react';
import { Link } from 'react-router';
import { createContainer } from 'engine';
import superagent from 'superagent';

class Login extends React.Component {

  getQueries() {
    let { userId } = this.context.model.getData();
    return {
      me: ['users', userId]
    };
  }

  render() {
    let { me } = this.props;
    let { userId } = this.context.model.getData();
    console.log('render', me, userId);

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
      });
  }
}

Login.contextTypes = {
  model: React.PropTypes.object
};

export default createContainer(Login, React);
