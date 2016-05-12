import React, { Component, PropTypes } from 'react'
import Relay, { createContainer } from 'react-relay'
import { Header } from 'react-mdl'
import { Content, Layout } from '../../../components/layout'

class AdminPage extends Component {

  static contextTypes = {
    model: PropTypes.object
  }

  static propTypes = {
    users: PropTypes.array
  }

  render () {
    let { users } = this.props

    return (
      <Layout>
        <Header transparent title='Amelisa CRUD Example (Admin)' />
        <Content>
          {users.map((user) => <div>{user.email}</div>)}
        </Content>
      </Layout>
    )
  }
}

const styles = {}

export default createContainer(AdminPage, {
    fragments: {
      users: () => Relay.QL`
        fragment on User @relay(plural: true) {
          id,
          name,
          email
        }
      `
    }
  }
)
