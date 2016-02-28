import React, { PropTypes } from 'react'
import { Login, Logout, Register } from '../../auth/components'
import { Layout, Content } from 'react-mdl'
import { createContainer } from 'amelisa/react'
import { Header } from '../components/layout'

class LoginPage extends React.Component {

  static contextTypes = {
    model: React.PropTypes.object
  };

  static propTypes = {
    loggedIn: PropTypes.bool
  };

  getQueries () {
    return {
      loggedIn: ['_session', 'loggedIn']
    }
  }

  render () {
    let { loggedIn } = this.props

    let content

    if (loggedIn) {
      content = (
        <Content>
          <Logout />
        </Content>
      )
    } else {
      content = (
        <Content>
          <Login />
          <Register />
        </Content>
      )
    }

    return (
      <Layout fixedHeader={true}>
        <Header />
        {content}
      </Layout>
    )
  }
}

export default createContainer(LoginPage)
