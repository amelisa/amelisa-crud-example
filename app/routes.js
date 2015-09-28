import React from 'react';
import { Route } from 'react-router';
import Root from '../components/Root';
import Doc from '../components/Doc';
import List from '../components/List';
import LoginPage from '../components/LoginPage';

export default (
  <Route handler={Root}>
    <Route name='list' path='/' handler={List} />
    <Route name='login' path='/login' handler={LoginPage} />
    <Route name='doc' path='/:collectionName/:docId' handler={Doc} />
  </Route>
)
