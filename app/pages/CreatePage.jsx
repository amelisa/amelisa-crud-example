import React, { Component, PropTypes } from 'react'
import { Button, Card, CardTitle, CardText, CardActions, Textfield } from 'react-mdl'
import { Content, Header, Layout } from '../../components/layout'

class CreatePage extends Component {

  static contextTypes = {
    model: PropTypes.object,
    router: PropTypes.any
  }

  render () {
    return (
      <Layout>
        <Header />
        <Content>
          <Card shadow={1}>
            <CardTitle>Create</CardTitle>
            <CardText>
              <Textfield floatingLabel label='Name' ref='name' />
            </CardText>
            <CardActions border>
              <Button onClick={this.onCreate}>Create</Button>
            </CardActions>
          </Card>
        </Content>
      </Layout>
    )
  }

  onCreate = () => {
    let { model, router } = this.context

    let userId = model.get('_session.userId')
    let name = this.refs.name.refs.input.value
    let id = model.id()

    let item = {
      id,
      name,
      userId
    }

    model
      .add('items', item)
      .then(() => {
        router.push(`/items/${id}`)
      })
      .catch((err) => {
        window.alert(err)
      })
  }
}

export default CreatePage
