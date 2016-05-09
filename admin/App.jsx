import React from 'react'
import { render } from 'react-dom'
import { RootContainer, injectNetworkLayer } from 'react-relay'
import { dbQueries } from 'amelisa-mongo'
import { getModel, IndexedDbStorage } from 'amelisa'
import { NetworkLayer } from 'relay-amelisa'
import AdminPage from './pages/AdminPage'
import AdminRoute from './routes/AdminRoute'
import createSchema from '../data/createSchema'

// model is main api
let model = getModel({
  modelOptions: {dbQueries, createSchema},
  Storage: IndexedDbStorage
})

// try to enter 'model.get()' in dev console to see all data in model
window.model = model

injectNetworkLayer(new NetworkLayer(model))

// 'ready' means that connection with server has estabilished and data is synced
// while offline, it means that data is read from client storage
model.on('ready', () => {
  render(
    <RootContainer
      Component={AdminPage}
      route={new AdminRoute()}
    />
  , document.getElementById('root'))
})
