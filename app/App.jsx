import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router'
import Routes from './Routes'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { getModel } from 'amelisa/react'

// require('events').EventEmitter.prototype._maxListeners = 100

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

let model = getModel()

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
