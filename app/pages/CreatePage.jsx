import React, { Component, PropTypes } from 'react'
import { Layout, Content, Button, Textfield } from 'react-mdl'
import { Header } from '../components/layout'

class CreatePage extends Component {

  static contextTypes = {
    model: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  static propTypes = {
    userId: PropTypes.string
  };

  render () {
    return (
      <Layout fixedHeader={true}>
        <Header />
        <Content>
          Create
          <Textfield label='Name' ref='name' />
          <Button onClick={this.create}>Create</Button>
        </Content>
      </Layout>
    )
  }

  create = () => {
    let { history, model } = this.context

    let userId = model.get('_session.userId')
    let name = this.refs.name.refs.input.value
    let itemId = model.id()

    let item = {
      id: itemId,
      name,
      userId
    }

    model
      .add('items', item)
      .then(() => {
        history.push('/items/' + itemId)
      })
      .catch((err) => {
        window.alert(err)
      })
  };
}

export default CreatePage
