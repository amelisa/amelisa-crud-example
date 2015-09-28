import React from 'react';
import Base from './Base';

class Logout extends Base {

  render() {
    return (
      <button onClick={this.logout.bind(this)}>Logout</button>
    );
  }

  logout() {
    this.send({}, '/auth/logout');
  }
}

Logout.contextTypes = {
  model: React.PropTypes.object
};

export default Logout;
