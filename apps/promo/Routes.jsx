import React from 'react'
import { Route } from 'react-router'
import Root from './pages/Root'
import LoginPage from './pages/LoginPage'

let Routes = (
  <Route path='/' component={Root}>
    <Route path='login' component={LoginPage} />
  </Route>
)

export default Routes
