import React, { Component, PropTypes } from 'react'
import Relay, { createContainer } from 'react-relay'
import { Card, CardTitle, CardText, Header } from 'react-mdl'
import { Content, Layout } from '../../../components/layout'

class AdminPage extends Component {

  static contextTypes = {
    model: PropTypes.object
  }

  static propTypes = {
    users: PropTypes.array
  }

  render () {
    let { viewer } = this.props

    return (
      <Layout>
        <Header transparent title='Amelisa CRUD Example (Admin)' />
        <Content>
          {viewer.users.map((user) => (
            <Card key={user.id} style={styles.listMenu} shadow={1}>
              <CardTitle style={styles.listTitle}>
                {user.name} has {user.items.length} items
              </CardTitle>
              <CardText style={styles.listText}>
                {user.items.map((item) => (
                  <p key={item.id}>{item.name}</p>
                ))}
              </CardText>
            </Card>
          ))}
        </Content>
      </Layout>
    )
  }
}

const styles = {}

export default createContainer(AdminPage, {
    fragments: {
      viewer: () => Relay.QL`
        fragment on Viewer {
          id,
          name,
          email,
          users {
            id,
            name,
            email,
            items {
              id,
              name,
              description
            }
          }
        }
      `
    }
  }
)
