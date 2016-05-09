import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { createContainer } from 'react-amelisa'
import { Header as MdlHeader, HeaderRow, Icon, Navigation, Spacer } from 'react-mdl'

class Header extends Component {

  static contextTypes = {
    model: PropTypes.object
  }

  static propTypes = {
    user: PropTypes.object,
    online: PropTypes.bool,
    loggedIn: PropTypes.bool
  }

  subscribe () {
    let { model } = this.context
    let userId = model.get('_session.userId')

    return {
      user: ['users', userId],
      online: ['_session', 'online'],
      loggedIn: ['_session', 'loggedIn']
    }
  }

  render () {
    let { user, online, loggedIn } = this.props

    return (
      <MdlHeader transparent style={styles.header}>
        <HeaderRow>
          <Link className='mdl-layout-title' style={styles.link} to='/'>Amelisa CRUD Example</Link>
          <Spacer />
          <Navigation className='mdl-layout--large-screen-only'>
            <span>Online: {online ? 'Yes' : 'No'}</span>
            <span>Logged In: {loggedIn ? 'Yes ' + user.email : 'No'}</span>
            <Link to='/create'>Create</Link>
            <a href='/auth/logout'>Logout</a>
          </Navigation>
        </HeaderRow>
      </MdlHeader>
    )
  }
}

const styles = {
  header: {
    color: 'white'
  },
  link: {
    color: 'white',
    textDecoration: 'none'
  }
}

export default createContainer(Header)
