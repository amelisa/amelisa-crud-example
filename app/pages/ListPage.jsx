import React, { Component, PropTypes } from 'react'
import { createContainer } from 'react-amelisa'
import { Button, Card, CardTitle, CardText, CardActions } from 'react-mdl'
import { Link } from 'react-router'
import { Content, Header, Layout } from '../../components/layout'
import { Item } from '../components/item'

const itemsOnPage = 5

class ListPage extends Component {

  static contextTypes = {
    model: PropTypes.object
  }

  static propTypes = {
    location: PropTypes.object,
    items: PropTypes.array,
    itemsCount: PropTypes.number,
    user: PropTypes.object,
    userId: PropTypes.string,
    setQueries: PropTypes.func,
    resubscribe: PropTypes.func
  }

  state = {
    showAll: false
  }

  subscribe () {
    let { page = 1 } = this.props.location.query
    let { showAll } = this.state
    let { model } = this.context
    let userId = model.get('_session.userId')

    // here component subscribes to data
    // data will be in corresponding keys in props
    return {
      items: ['items', showAll ? {userId} : {
        userId,
        $skip: ((page - 1) * itemsOnPage),
        $limit: itemsOnPage,
        $orderby: {name: 1}}
      ],
      itemsCount: ['items', {userId, $count: true}],
      userId: ['_session', 'userId']
    }
  }

  render () {
    // every time data changes, component rerenders
    let { page = 1 } = this.props.location.query
    let { items, itemsCount } = this.props
    page = +page

    let pagesCount = Math.ceil(itemsCount / Math.max(itemsOnPage, items.length))
    if (page > pagesCount) page = pagesCount
    let prevPage = page === 1 ? null : page - 1
    let nextPage = page === pagesCount ? null : page + 1

    return (
      <Layout>
        <Header />
        <Content>
          <Card style={styles.listMenu} shadow={1}>
            <CardTitle style={styles.listTitle}>
              {items.length} of {itemsCount} items shown on page {page} of {pagesCount}
            </CardTitle>
            <CardText style={styles.listText}>
              <span style={styles.pageLink}>
                {prevPage ? <Link to={{query: {page: prevPage}}}>Prev</Link> : 'Prev'}
              </span>
              <span style={styles.pageLink}>
                {nextPage ? <Link to={{query: {page: nextPage}}}>Next</Link> : 'Next'}
              </span>
            </CardText>
            <CardActions border>
              <Button onClick={this.onAdd}>Add</Button>
              <Button onClick={this.onShowAll}>Show All</Button>
              <Button onClick={this.onShowAll2}>Show All2</Button>
            </CardActions>
          </Card>
          {items.map((item) => <Item key={item.id} item={item} />)}
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
  }

  onShowAll2 = () => {
    let { resubscribe } = this.props

    // If subscribe data is not passed to resubscribe as parameter,
    // it runs subscribe one more time to get it
    // It's possible to use state here for our needs
    this.setState({showAll: true}, resubscribe)
  }

  onAdd = () => {
    let { model } = this.context

    let userId = model.get('_session.userId')
    let name = Math.random().toString(36).substring(2, 7)
    let description = Math.random().toString(36).substring(2)
    model.add('items', {name, description, userId})
  }
}

const styles = {
  listMenu: {
    minHeight: 150,
    marginBottom: 20
  },
  listTitle: {
  },
  listText: {
    flexDirection: 'column'
  },
  pageLink: {
    marginRight: 10
  }
}

export default createContainer(ListPage)
