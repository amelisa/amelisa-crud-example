import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Root from './pages/Root'
import Doc from './pages/Doc'
import LoginPage from './pages/LoginPage'
import List from './pages/List'

let Routes = (
  <Route path='/' component={Root}>
    <IndexRoute component={List}/>
    <Route path='/login' component={LoginPage} />
    <Route path='/:collectionName/:docId' component={Doc} />
  </Route>
)

export default Routes
