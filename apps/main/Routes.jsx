import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Root from './pages/Root'
import CreatePage from './pages/CreatePage'
import ItemPage from './pages/ItemPage'
import ListPage from './pages/ListPage'

let Routes = (
  <Route path='/' component={Root}>
    <IndexRoute component={ListPage} />
    <Route path='create' component={CreatePage} />
    <Route path='items/:itemId' component={ItemPage} />
    <Route path='list' component={ListPage} />
  </Route>
)

export default Routes
