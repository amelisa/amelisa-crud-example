import React, { Component, PropTypes } from 'react'
import { createContainer } from 'react-amelisa'
import { Header } from 'react-mdl'
import { Content, Layout } from '../../components/layout'
import { Login, LoginProviders, Register } from '../components/auth'
import backgroundImage from './backgroundImage'

class LoginPage extends Component {

  static contextTypes = {
    model: PropTypes.object
  }

  static propTypes = {
    online: PropTypes.bool
  }

  subscribe () {
    // _session.online variable helps to distiguish online/offline states
    return {
      online: ['_session', 'online']
    }
  }

  render () {
    let { online } = this.props

    let content
    if (online) {
      content = [
        <Register key='register' style={styles.card} />,
        <Login key='login' style={styles.card} />,
        <LoginProviders key='providers' style={styles.card} />
      ]
    } else {
      content = <h1 style={styles.label}>Can not login while offline</h1>
    }

    return (
      <Layout style={styles.layout}>
        <Header transparent title='Amelisa CRUD Example' />
        <Content>
          <h1 style={styles.label}>Welcome, developer!</h1>
          {content}
        </Content>
      </Layout>
    )
  }
}

const styles = {
  layout: {
    background: `
      url(${backgroundImage})
      center / cover
    `
  },
  card: {
    marginBottom: 50
  },
  label: {
    color: 'white'
  }
}

export default createContainer(LoginPage)
