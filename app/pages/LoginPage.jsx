import React, { Component, PropTypes } from 'react'
import { Login, Logout, Register } from '../../auth/components'
import { Layout, Content } from 'react-mdl'
import { createContainer } from 'react-amelisa'
import { Header } from '../components/layout'

class LoginPage extends Component {

  static contextTypes = {
    model: PropTypes.object
  };

  static propTypes = {
    loggedIn: PropTypes.bool
  };

  subscribe () {
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
