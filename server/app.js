import express from 'express';
import React from 'react';
import Router from 'react-router';
import routes from '../app/routes';
import expressWs from 'express-ws';
import session from 'express-session';
import auth from 'engine-auth';
import bodyParser from 'body-parser';
let MongoStore = require('connect-mongo')(session);

export default function (store, httpServer, mongoUrl) {
  let sessionOptions = {
    secret: 'secret',
    store: new MongoStore({
      url: mongoUrl
    })
  }

  let app = express();
  expressWs(app, httpServer);
  app.use(session(sessionOptions));
  app.use(bodyParser.json());
  app.use(store.modelMiddleware());
  app.use(auth.middleware(store));
  app.use((req, res, next) => {
    let model = req.getModel();
    let userId = model.get('_auth', 'session', 'userId');

    console.log(model.get('_auth', 'session'));

    model.fetch('users', userId, () => {
      let user = model.get('users', userId);
      model.set('_auth', 'user', 'me', user);

      next();
    });
  });

  app.use((req, res, next) => {
    if (req.url === '/favicon.ico' || req.url === '/.websocket') {
      return next();
    }

    let model = req.getModel();

    Router.run(routes, req.url, (Handler) => {

      let Factory = React.createFactory(Handler);
      let html = React.renderToString(Factory({model: model}));

      return res.send(html);
    });
  });

  return app;
}
