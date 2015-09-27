import React from 'react';
import { Link } from 'react-router';
import { createContainer } from 'engine';
import superagent from 'superagent';

class Register extends React.Component {

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
      });
  }
}

Register.contextTypes = {
  model: React.PropTypes.object
};

export default createContainer(Register, React);
