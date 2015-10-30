process.env.DEBUG = '*,-MutableDoc,-RemoteDoc';
let React = require('react');
let Router = require('react-router');
let routes = require('./routes');
let { getModel } = require('amelisa');

let model = getModel();

model.once('ready', () => {
  Router.run(routes, Router.HistoryLocation, (Handler) => {
    React.render(<Handler model={model} />, document);
  });
});
