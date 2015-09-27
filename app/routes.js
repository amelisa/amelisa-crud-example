import React from 'react';
import { Route } from 'react-router';
import App from '../components/App';
import Doc from '../components/Doc';
import List from '../components/List';
import Login from '../components/Login';
import Register from '../components/Register';

export default (
  <Route handler={App}>
    <Route name='list' path='/' handler={List} />
    <Route name='login' path='/login' handler={Login} />
    <Route name='register' path='/register' handler={Register} />
    <Route name='doc' path='/:collectionName/:docId' handler={Doc} />
  </Route>
)
