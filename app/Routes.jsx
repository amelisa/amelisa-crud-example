import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Root from './pages/Root'
import Create from './pages/Create'
import Doc from './pages/Doc'
import LoginPage from './pages/LoginPage'
import List from './pages/List'

let Routes = (
  <Route path='/' component={Root}>
    <IndexRoute component={List}/>
    <Route path='/list' component={List} />
    <Route path='/login' component={LoginPage} />
    <Route path='/:collectionName/:docId' component={Doc} />
    <Route path='/create' component={Create} />
  </Route>
)

export default Routes
