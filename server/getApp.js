import express from 'express'
import React from 'react'
import { renderToStaticMarkup, createElement } from 'amelisa'
import { match, RoutingContext } from 'react-router'
import routes from '../app/Routes'
import session from 'express-session'
import auth from 'amelisa-auth'
import bodyParser from 'body-parser'
let MongoStore = require('connect-mongo')(session)
import HtmlLayout from '../app/pages/HtmlLayout'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.dev.babel'

export default function (store, mongoUrl) {
  let sessionOptions = {
    secret: 'secret',
    store: new MongoStore({
      url: mongoUrl
    })
  }

  let compiler = webpack(webpackConfig)

  let app = express()

  app.use(webpackDevMiddleware(compiler, webpackConfig.devServer))
  app.use(webpackHotMiddleware(compiler))

  app.use(express.static(process.cwd() + '/public'))
    .use(session(sessionOptions))
    .use(bodyParser.json())
    .use(store.modelMiddleware())
    .use(auth.middleware(store))

  app.use((req, res, next) => {
    let model = req.getModel()
    let userId = model.get('_session.userId')

    let userDoc = model.doc('users', userId)
    userDoc
      .fetch()
      .then(() => {
        let user = userDoc.get()
        model.set('_session.user', user)
        next()
      })
      .catch(next)
  })

  app.use((req, res, next) => {
    let model = req.getModel()

    model
      .prepareBundle()
      .then(() => {
        match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
          if (error) {
            res.status(500).send(error.message)
          } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
          } else if (renderProps) {
            // FIXME: hack for passing model through react-router
            renderProps.location.model = model
            // FIXME: hack to be able overwrite React.createElement
            renderProps.createElement = createElement

            let children = <RoutingContext {...renderProps} />

            renderToStaticMarkup(HtmlLayout, {model}, children)
              .then((html) => {
                res.status(200).send(html)
              })
          } else {
            res.status(404).send('Not found')
          }
        })
      })
      .catch(next)
  })

  return app
}
