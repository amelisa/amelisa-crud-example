import React from 'react';
import { Link } from 'react-router';
import { createContainer } from 'amelisa';
import { Layout, Content, Card, Textfield } from 'react-mdl';
import { Header } from '../components/layout'

class List extends React.Component {

  static contextTypes = {
    model: React.PropTypes.object
  }

  getQueries() {
    let { page = 1 } = this.props.location.query;
    let { userId } = this.context.model.get('_session');

    return {
      users: ['users', {$skip: ((page - 1) * 5), $limit: 5, $orderby: {name: 1}}],
      usersCount: ['users', {$count: true}],
      user: ['users', userId],
      userId: ['_session', userId]//,
      // stargazers: ['https://api.github.com/repos/facebook/react/stargazers?per_page=10', []]
    };
  }

  render() {
    let { users, usersCount, user, userId, stargazers } = this.props;
    console.log('List render', {users, usersCount, user, userId, stargazers});

    if (!users) return <div>empty users</div>;

    return (
      <Layout fixedHeader={true}>
        <Header />
        <Content>
          <div className='page-content'>
            List ({users.length} from {usersCount})
            {
              users.map(user => {
                let isMe = user._id === userId;
                return (
                  <Card key={user._id} className='item' shadowLevel={2}>
                    <Link to={`/users/${user._id}`}>{user.name || 'no name'}</Link>
                    <input onChange={this.set.bind(this, user._id)} value={user.name} />
                    <button onClick={this.del.bind(this, user._id)}>Delete</button>
                    {isMe && 'me'}
                  </Card>
                  )
                })
            }
            <button onClick={this.asdf.bind(this)}>asdf</button>
            <button onClick={this.all.bind(this)}>all</button>
            <button onClick={this.add.bind(this)}>add</button>
            <Link to='list' query={{page: 1}}>Page 1</Link>
            <Link to='list' query={{page: 2}}>Page 2</Link>
          </div>
        </Content>
      </Layout>
    );
  }

  asdf() {
    console.log('asdf');
    this.props.setQueries({
      users: ['users', {name: 'asdf'}],
      usersCount: ['users', {$count: true}]
    });
  }

  all() {
    console.log('all');
    this.props.setQueries({
      users: ['users', {}],
      usersCount: ['users', {$count: true}]
    });
  }

  add() {
    console.log('add');
    let userId = this.context.model.id();
    this.context.model
      .add('users', {_id: userId, name: 'user ' + userId})
      .then(() => {
        console.log('add done');
      })
      .catch((err) => {
        console.error('add err', err);
      });
  }

  set(userId, event) {
    let value = event.nativeEvent.target.value;
    console.log('set', userId, value);
    this.context.model
      .set(['users', userId, 'name'], value)
      .then(() => {
        console.log('set done');
      })
      .catch((err) => {
        console.error('set err', err);
      });
  }

  del(userId) {
    console.log('del', userId);
    this.context.model
      .del(['users', userId])
      .then(() => {
        console.log('del done');
      })
      .catch((err) => {
        console.error('del err', err);
      });
  }
}

export default createContainer(List, React);
