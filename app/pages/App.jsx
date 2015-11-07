import React from 'react';
import { Link } from 'react-router';
import { createContainer } from 'amelisa';
import { Layout, Header, Navigation, Drawer, Spacer, Content } from 'react-mdl';

class App extends React.Component {

  getQueries() {
    let { userId } = this.context.model.get('_session');

    return {
      session: ['_session'],
      user: ['users', userId]
    }
  }

  render() {
    let { children, user } = this.props;
    let { online, loggedIn } = this.context.model.get('_session');
    console.log('App render', online, loggedIn, user)

    return (
      <Layout fixedHeader={true}>
        <Header title='Crud'>
          <Spacer />
          <Navigation className='mdl-layout--large-screen-only'>
            <span>Online: {online ? 'Yes' : 'No'}</span>
            <span>Logged In: {loggedIn ? 'Yes ' + user.email : 'No'}</span>
            <Link to='/'>List</Link>
            <Link to='/login'>Login</Link>
          </Navigation>
        </Header>
        <Drawer title='Crud'>
          <Navigation>
            <Link to='/'>List</Link>
            <Link to='/login'>Login</Link>
          </Navigation>
        </Drawer>
        <Content>
          <div className='page-content'>
            {children}
          </div>
        </Content>
      </Layout>
    )
  }
}

App.contextTypes = {
  model: React.PropTypes.object
};

export default createContainer(App, React);
