import React, { PropTypes } from 'react'
import { Layout, Content, Button, Textfield } from 'react-mdl'
import { Header } from '../components/layout'
import { createContainer } from 'amelisa'

class Create extends React.Component {

  static contextTypes = {
    model: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired
  }

  static propTypes = {
    userId: PropTypes.string
  }

  getQueries () {
    return {
      userId: '_session.userId'
    }
  }

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
    let { userId } = this.props
    let name = this.refs.name.refs.input.value
    let itemId = this.context.model.id()

    let item = {
      _id: itemId,
      name,
      userId
    }

    this.context.model
      .add('items', item)
      .then(() => {
        this.context.history.push('/items/' + itemId)
      })
      .catch((err) => {
        window.alert(err)
      })
  }
}

export default createContainer(Create, React)
