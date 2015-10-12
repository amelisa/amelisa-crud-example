import express from 'express';
import React from 'react';
import Router from 'react-router';
import routes from '../app/routes';
import session from 'express-session';
import auth from 'engine-auth';
import bodyParser from 'body-parser';
let MongoStore = require('connect-mongo')(session);

export default function (store, mongoUrl) {
  let sessionOptions = {
    secret: 'secret',
    store: new MongoStore({
      url: mongoUrl
    })
  }

  let app = express();
  app.use(session(sessionOptions));
  app.use(bodyParser.json());
  app.use(store.modelMiddleware());
  app.use(auth.middleware(store));
  app.use((req, res, next) => {
    let model = req.getModel();
    let userId = model.get('_session.userId');

    let userDoc = model.doc('users', userId);
    userDoc
      .fetch()
      .then(() => {
        let user = userDoc.get();
        model.set('_session.user', user);
        next();
      })
      .catch(next);
  });

  app.use((req, res, next) => {
    if (req.url === '/favicon.ico' || req.url === '/.websocket') {
      return next();
    }

    let model = req.getModel();

    model
      .prepareBundle()
      .then(() => {
        Router.run(routes, req.url, (Handler) => {

          let Factory = React.createFactory(Handler);
          let html = React.renderToString(Factory({model}));

          res.send(html);
        });
      })
      .catch(next);
  });

  return app;
}
