import React, { Component, PropTypes } from 'react'
import { createContainer } from 'react-amelisa'
import { Content, Header, Layout } from '../../../components/layout'
import { Item } from '../components/item'

class ItemPage extends Component {

  static contextTypes = {
    model: PropTypes.object
  }

  static propTypes = {
    item: PropTypes.object,
    params: PropTypes.object,
    user: PropTypes.object
  }

  subscribe () {
    let { itemId } = this.props.params

    return {
      item: ['items', itemId]
    }
  }

  render () {
    let { item } = this.props

    return (
      <Layout>
        <Header />
        <Content>
          <Item item={item} edit />
        </Content>
      </Layout>
    )
  }
}

export default createContainer(ItemPage)
