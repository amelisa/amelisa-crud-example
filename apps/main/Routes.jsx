import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Root from './pages/Root'
import CreatePage from './pages/CreatePage'
import itemPage from './pages/itemPage'
import ListPage from './pages/ListPage'

let Routes = (
  <Route path='/' component={Root}>
    <IndexRoute component={ListPage} />
    <Route path='create' component={CreatePage} />
    <Route path='items/:itemId' component={itemPage} />
    <Route path='list' component={ListPage} />
  </Route>
)

export default Routes
