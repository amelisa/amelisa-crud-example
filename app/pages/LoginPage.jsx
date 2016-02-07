import React from 'react'
import { Login, Logout, Register } from '../../auth/components'
import { Layout, Content } from 'react-mdl'
import { Header } from '../components/layout'

class LoginPage extends React.Component {

  static contextTypes = {
    model: React.PropTypes.object
  };

  render () {
    return (
      <Layout fixedHeader={true}>
        <Header />
        <Content>
          <Login />
          <Logout />
          <Register />
        </Content>
      </Layout>
    )
  }
}

export default LoginPage
