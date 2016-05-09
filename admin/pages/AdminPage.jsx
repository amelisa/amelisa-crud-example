import React, { Component, PropTypes } from 'react'
import Relay, { createContainer } from 'react-relay'
import { Header } from 'react-mdl'
import { Content, Layout } from '../../components/layout'

class AdminPage extends Component {

  static contextTypes = {
    model: PropTypes.object
  }

  static propTypes = {
    user: PropTypes.object
  }

  render () {
    let { user } = this.props
    console.log('user', user)

    return (
      <Layout>
        <Header transparent title='Amelisa CRUD Example (Admin)' />
        <Content>
          {/*{users.map((user) => <div>{user.email}</div>)}*/}
        </Content>
      </Layout>
    )
  }
}

const styles = {}

export default createContainer(AdminPage, {
    fragments: {
      user: () => Relay.QL`
        fragment on User {
          items {
            id,
            name
          }
        }
      `
    }
  }
)
