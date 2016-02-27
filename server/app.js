import express from 'express'
import React from 'react'
import session from 'express-session'
import { createElement, renderToStaticMarkup } from 'amelisa/server'
import auth from 'amelisa-auth'
import bodyParser from 'body-parser'
let MongoStore = require('connect-mongo')(session)
import HtmlLayout from '../app/pages/HtmlLayout'
import { match, RoutingContext } from 'react-router'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.dev.babel'
import routes from '../app/Routes'
import store from './store'
import { options as authOptions } from './auth'

let wrap = fn => (...args) => fn(...args).catch(args[2])

let sessionOptions = {
  secret: 'secret',
  store: new MongoStore({
    url: process.env.MONGO_URL
  })
}

let compiler = webpack(webpackConfig)

let app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(webpackDevMiddleware(compiler, webpackConfig.devServer))
  app.use(webpackHotMiddleware(compiler))
}

app.use(express.static(process.cwd() + '/public'))
  .use(session(sessionOptions))
  .use(bodyParser.json())
  .use(store.modelMiddleware())
  .use(auth.middleware(store, authOptions))

// app.use(wrap(async (req, res, next) => {
//   if (!req.session.loggedIn && req.path.indexOf('/login') === -1) {
//     return res.redirect('/login')
//   }
//   next()
// }))

function matchUrl (location) {
  return new Promise((resolve, reject) => {
    match({routes, location}, (err, redirectLocation, renderProps) => {
      if (err) return reject(err)

      resolve({redirectLocation, renderProps})
    })
  })
}

app.use(wrap(async (req, res, next) => {
  let model = req.getModel()

  model.prepareBundle()

  let { redirectLocation, renderProps } = await matchUrl(req.url)

  if (redirectLocation) {
    return res.redirect(302, redirectLocation.pathname + redirectLocation.search)
  } else if (renderProps) {
    // FIXME: hack for passing model through react-router
    renderProps.location.model = model
    // FIXME: hack to be able overwrite React.createElement
    renderProps.createElement = createElement

    let children = <RoutingContext {...renderProps} />
    // console.log(req.url)
    let html = await renderToStaticMarkup(HtmlLayout, {model}, children)
    return res.status(200).send(html)
  } else {
    return res.status(404).send('Not found')
  }
}))

export default app
