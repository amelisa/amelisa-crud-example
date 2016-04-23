import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { createContainer } from 'amelisa/react'
import { Layout, Content, Card } from 'react-mdl'
import { Header } from '../components/layout'

class ListPage extends Component {

  state = {
    showAll: false
  };

  static contextTypes = {
    model: PropTypes.object
  };

  static propTypes = {
    location: PropTypes.object,
    items: PropTypes.array,
    itemsCount: PropTypes.number,
    user: PropTypes.object,
    userId: PropTypes.string,
    setQueries: PropTypes.func,
    resubscribe: PropTypes.func
  };

  subscribe () {
    let { page = 1 } = this.props.location.query
    let { showAll } = this.state

    return {
      items: ['items', showAll ? {} : {$skip: ((page - 1) * 5), $limit: 5, $orderby: {name: 1}}],
      itemsCount: ['items', {$count: true}],
      userId: ['_session', 'userId']
    }
  }

  render () {
    let { items, itemsCount, userId } = this.props

    return (
      <Layout fixedHeader={true}>
        <Header />
        <Content>
          List ({items.length} from {itemsCount})
          {
            items.map(item => {
              let isMe = item.userId === userId
              return (
                <Card key={item._id} className='item' shadowLevel={2}>
                  <Link to={`/items/${item._id}`}>{item.name || 'no name'}</Link>
                  <input onChange={this.set.bind(this, item._id)} value={item.name} />
                  <button onClick={this.del.bind(this, item._id)}>Delete</button>
                  {isMe && 'me'}
                </Card>
                )
            })
          }
          <button onClick={this.add}>add</button>
          <button onClick={this.onShowAll}>Show All</button>
          <button onClick={this.onShowAll2}>Show All2</button>
          <Link to='list' query={{page: 1}}>Page 1</Link>
          <Link to='list' query={{page: 2}}>Page 2</Link>
        </Content>
      </Layout>
    )
  }

  onShowAll = () => {
    let { resubscribe } = this.props

    // It's possible to change subscriptions from component itself
    resubscribe({
      items: ['items', {}],
      itemsCount: ['items', {$count: true}],
      userId: ['_session', 'userId']
    })
  };

  onShowAll2 = () => {
    let { resubscribe } = this.props

    // If subscribe data is not passed to resubscribe as parameter,
    // it runs subscribe one more time to get it
    // It's possible to use state here for our needs
    this.setState({showAll: true}, resubscribe)
  };

  add = () => {
    let { model } = this.context

    let itemId = model.id()
    model
      .add('items', {_id: itemId, name: `item ${itemId}`})
      .catch((err) => {
        console.error('add error', err)
      })
  };

  set = (itemId, event) => {
    let { model } = this.context
    let value = event.nativeEvent.target.value

    model
      .set(['items', itemId, 'name'], value)
      .catch((err) => {
        console.error('set error', err)
      })
  };

  del = (itemId) => {
    let { model } = this.context

    model
      .del(['items', itemId])
      .catch((err) => {
        console.error('del error', err)
      })
  };
}

export default createContainer(ListPage)
