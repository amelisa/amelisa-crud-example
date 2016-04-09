import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Root from './pages/Root'
import CreatePage from './pages/CreatePage'
import DocPage from './pages/DocPage'
import LoginPage from './pages/LoginPage'
import ListPage from './pages/ListPage'

let Routes = (
  <Route path='/' component={Root}>
    <IndexRoute component={ListPage}/>
    <Route path='/create' component={CreatePage} />
    <Route path='/:collectionName/:docId' component={DocPage} />
    <Route path='/list' component={ListPage} />
    <Route path='/login' component={LoginPage} />
  </Route>
)

export default Routes
