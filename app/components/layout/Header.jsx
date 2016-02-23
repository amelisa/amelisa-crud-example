import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { createContainer } from 'amelisa/react'
import { Header as MdlHeader, HeaderRow, Icon, Navigation, Spacer } from 'react-mdl'

class Header extends React.Component {

  static contextTypes = {
    model: PropTypes.object
  };

  static propTypes = {
    user: PropTypes.object,
    online: PropTypes.bool,
    loggedIn: PropTypes.bool
  };

  getQueries () {
    let { userId } = this.context.model.get('_session')

    return {
      user: ['users', userId],
      online: ['_session', 'online'],
      loggedIn: ['_session', 'loggedIn']
    }
  }

  render () {
    let { user, online, loggedIn } = this.props

    return (
      <MdlHeader>
        <HeaderRow>
          <Link className='mdl-layout__drawer-button' to='/'>
            <Icon name='list' />
          </Link>
          <Spacer />
          <Navigation className='mdl-layout--large-screen-only'>
            <span>Online: {online ? 'Yes' : 'No'}</span>
            <span>Logged In: {loggedIn ? 'Yes ' + user.email : 'No'}</span>
            <Link to='/create'>Create</Link>
            <Link to='/login'>Login</Link>
          </Navigation>
        </HeaderRow>
      </MdlHeader>
    )
  }
}

export default createContainer(Header, React)
