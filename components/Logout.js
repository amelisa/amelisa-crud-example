import React from 'react';
import { Link } from 'react-router';
import { createContainer } from 'engine';
import superagent from 'superagent';

class Logout extends React.Component {

  getQueries() {
    return {
      session: ['_auth', 'session']
    };
  }

  render() {
    let { session } = this.props;

    return (
      <button onClick={this.logout.bind(this)}>Logout</button>
    );
  }

  logout() {
    superagent
      .post('/auth/logout')
      .set('X-Requested-With', 'XMLHttpRequest')
      .end((err, res) => {
        console.log(err, res.body);
        if (!err && res.body.success) {
          this.context.model.set('_auth', 'session', 'loggedIn', false);
        }
      });
  }
}

Logout.contextTypes = {
  model: React.PropTypes.object
};

export default createContainer(Logout, React);
