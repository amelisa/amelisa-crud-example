import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { createContainer } from 'amelisa'
import { Header as MdlHeader, Navigation, Spacer } from 'react-mdl'

class Header extends React.Component {

  static contextTypes = {
    model: PropTypes.object
  };

  static propTypes = {
    user: PropTypes.object
  };

  getQueries () {
    let { userId } = this.context.model.get('_session')

    return {
      session: ['_session'],
      user: ['users', userId]
    }
  }

  render () {
    let { user } = this.props
    let { online, loggedIn } = this.context.model.get('_session')

    return (
      <MdlHeader title='Crud'>
        <Spacer />
        <Navigation className='mdl-layout--large-screen-only'>
          <span>Online: {online ? 'Yes' : 'No'}</span>
          <span>Logged In: {loggedIn ? 'Yes ' + user.email : 'No'}</span>
          <Link to='/'>List</Link>
          <Link to='/create'>Create</Link>
          <Link to='/login'>Login</Link>
        </Navigation>
      </MdlHeader>
    )
  }
}

export default createContainer(Header, React)
