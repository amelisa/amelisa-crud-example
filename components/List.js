import React from 'react';
import { Link } from 'react-router';
import { createContainer } from 'engine';

class List extends React.Component {

  getQueries() {
    let { page = 1 } = this.props.query;
    let { userId } = this.context.model.get('_auth', 'session');

    return {
      users: ['users', {$skip: ((page - 1) * 5), $limit: 5, $orderby: {name: 1}}],
      usersCount: ['users', {$count: true}],
      user: ['users', userId],
      session: ['_auth', 'session']
    };
  }

  render() {
    let { users, usersCount, user, session } = this.props;
    let { userId } = session;
    console.log('render', users, usersCount, user, userId);

    return (
      <div>
        List ({users.length} from {usersCount})
        {
          users.map(user => {
            let isMe = user._id === userId;
            return (
              <div key={user._id}>
                <Link to='doc' params={{collectionName: 'users', docId: user._id}}>{user.name || 'no name'}</Link>
                <input onChange={this.set.bind(this, user._id)} value={user.name} />
                <button onClick={this.del.bind(this, user._id)}>Delete</button>
                {isMe && 'me'}
              </div>
              )
            })
        }
        <button onClick={this.asdf.bind(this)}>asdf</button>
        <button onClick={this.all.bind(this)}>all</button>
        <button onClick={this.add.bind(this)}>add</button>
        <Link to='list' query={{page: 1}}>Page 1</Link>
        <Link to='list' query={{page: 2}}>Page 2</Link>
      </div>
    );
  }

  asdf() {
    console.log('asdf');
    this.props.setQueries({
      users: ['users', {name: 'asdf'}]
    });
  }

  all() {
    console.log('all');
    this.props.setQueries({
      users: ['users', {}]
    });
  }

  add() {
    console.log('add');
    let userId = this.context.model.id();
    this.context.model.add('users', {_id: userId, name: 'user ' + userId}, (err) => {
      console.log('add done', err);
    });
  }

  set(userId, event) {
    let value = event.nativeEvent.target.value;
    console.log('set', userId, value);
    this.context.model.set('users', userId, 'name', value, (err) => {
      console.log('set done', err);
    });
  }

  del(userId) {
    console.log('del', userId);
    this.context.model.del('users', userId, (err) => {
      console.log('del done', err);
    });
  }
}

List.contextTypes = {
  model: React.PropTypes.object
};

export default createContainer(List, React);
