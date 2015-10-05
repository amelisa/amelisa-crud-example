process.env.DEBUG = '*';
let React = require('react');
let Router = require('react-router');
let routes = require('./routes');
let { model } = require('engine');
/*
import React from 'react';
import Router from 'react-router';

import routes from './routes';
*/

model.once('ready', () => {
  Router.run(routes, Router.HistoryLocation, (Handler) => {
    React.render(<Handler model={model} />, document);
  });
});
