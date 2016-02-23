import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { createContainer } from 'amelisa/react'
import { Layout, Content, Card } from 'react-mdl'
import { Header } from '../components/layout'

class List extends React.Component {

  static contextTypes = {
    model: React.PropTypes.object
  };

  static propTypes = {
    location: PropTypes.object,
    items: PropTypes.array,
    itemsCount: PropTypes.number,
    user: PropTypes.object,
    userId: PropTypes.string,
    setQueries: PropTypes.func
  };

  getQueries () {
    let { page = 1 } = this.props.location.query

    return {
      items: ['items', {$skip: ((page - 1) * 5), $limit: 5, $orderby: {name: 1}}],
      itemsCount: ['items', {$count: true}],
      userId: ['_session', 'userId']
    }
  }

  render () {
    let { items, itemsCount, userId } = this.props

    if (!items) return <div>empty items</div>

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
          <button onClick={this.add.bind(this)}>add</button>
          <Link to='list' query={{page: 1}}>Page 1</Link>
          <Link to='list' query={{page: 2}}>Page 2</Link>
        </Content>
      </Layout>
    )
  }

  add () {
    let itemId = this.context.model.id()
    this.context.model
      .add('items', {_id: itemId, name: 'item ' + itemId})
      .catch((err) => {
        console.error('add error', err)
      })
  }

  set (itemId, event) {
    let value = event.nativeEvent.target.value
    this.context.model
      .set(['items', itemId, 'name'], value)
      .catch((err) => {
        console.error('set error', err)
      })
  }

  del (itemId) {
    this.context.model
      .del(['items', itemId])
      .catch((err) => {
        console.error('del error', err)
      })
  }
}

export default createContainer(List, React)
