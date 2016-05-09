import express from 'express'
import React from 'react'
import session from 'express-session'
import { createElement, renderToStaticMarkup } from 'react-amelisa/server'
import auth from 'amelisa-auth'
import { match, RouterContext } from 'react-router'
import bodyParser from 'body-parser'
let MongoStore = require('connect-mongo')(session)
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.dev.babel'
// import adminRoutes from '../admin/Routes'
import appRoutes from '../app/Routes'
import promoRoutes from '../promo/Routes'
import store from './store'
import { options as authOptions } from './auth'
import HtmlLayout from '../components/HtmlLayout'

const appsRoutes = {
  app: appRoutes,
  // admin: adminRoutes,
  promo: promoRoutes
}

let wrap = fn => (...args) => fn(...args).catch(args[2])

let sessionOptions = {
  secret: 'secret',
  store: new MongoStore({
    db: store.storage.db // reuse same connection
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

app.use(wrap(async (req, res, next) => {
  let { loggedIn } = req.session

  if (!loggedIn && req.path.indexOf('/login') === -1) {
    return res.redirect('/login')
  }

  if (loggedIn && req.path.indexOf('/login') > -1) {
    return res.redirect('/')
  }

  if (loggedIn && req.path.indexOf('/admin') > -1) {
    let model = req.getModel()
    model.prepareBundle()
    let html = await renderToStaticMarkup(HtmlLayout, {model, app: 'admin'})
    return res.status(200).send(html)
  }

  next()
}))

function matchUrl (location, routes) {
  return new Promise((resolve, reject) => {
    match({routes, location}, (err, redirectLocation, renderProps) => {
      if (err) return reject(err)

      resolve({redirectLocation, renderProps})
    })
  })
}

async function matchAppRoutes (location) {
  for (let app in appsRoutes) {
    let routes = appsRoutes[app]

    let { redirectLocation, renderProps } = await matchUrl(location, routes)
    if (redirectLocation || renderProps) {
      return {
        app,
        redirectLocation,
        renderProps
      }
    }
  }
  return {}
}

app.use(wrap(async (req, res, next) => {
  let { app, redirectLocation, renderProps } = await matchAppRoutes(req.url)

  if (redirectLocation) {
    return res.redirect(302, redirectLocation.pathname + redirectLocation.search)
  }

  if (!renderProps) return res.status(404).send('Not found')

  let model = req.getModel()

  model.prepareBundle()
  // FIXME: hack for passing model through react-router
  renderProps.location.model = model
  // FIXME: hack to be able overwrite React.createElement
  renderProps.createElement = createElement
  let children = <RouterContext {...renderProps} />
  let html = await renderToStaticMarkup(HtmlLayout, {model, app}, children)
  return res.status(200).send(html)
}))

export default app
