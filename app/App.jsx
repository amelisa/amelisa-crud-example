import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router'
import Routes from './Routes'
import Loading from '../components/Loading'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { dbQueries } from 'amelisa-mongo'
import { setLoading } from 'react-amelisa'
import { getModel, IndexedDbStorage } from 'amelisa'

// require('events').EventEmitter.prototype._maxListeners = 100

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

setLoading(Loading)

let model = getModel({
  modelOptions: {dbQueries},
  Storage: IndexedDbStorage
})

window.model = model

function onUpdate () {
  window.scrollTo(0, 0)
}

function createElement (Component, props) {
  props.model = model
  return <Component {...props} />
}

model.on('ready', () => {
  render(
    <Router history={createBrowserHistory()} onUpdate={onUpdate} createElement={createElement}>
      {Routes}
    </Router>
  , document.getElementById('app'))
})
