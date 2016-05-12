import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { setLoading } from 'react-amelisa'
import { dbQueries } from 'amelisa-mongo'
import { getModel, IndexedDbStorage } from 'amelisa'
import Routes from './Routes'
import Loading from '../../components/Loading'

// set default loading page
setLoading(Loading)

// model is main api
let model = getModel({
  modelOptions: {dbQueries},
  Storage: IndexedDbStorage
})

// try to enter 'model.get()' in dev console to see all data in model
window.model = model

function onUpdate () {
  window.scrollTo(0, 0)
}

// passing model to Root component
function createElement (Component, props) {
  return <Component {...props} model={model} />
}

// 'ready' means that connection with server has estabilished and data is synced
// while offline, it means that data is read from client storage
model.on('ready', () => {
  render(
    <Router history={browserHistory} onUpdate={onUpdate} createElement={createElement}>
      {Routes}
    </Router>
  , document.getElementById('root'))
})
