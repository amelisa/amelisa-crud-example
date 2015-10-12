process.env.DEBUG = '*,-express:*';
let http = require('http');
let { MongoStorage, RedisChannel, ServerSocketChannel, Store } = require('engine');

let port = 3000;
let mongoUrl = 'mongodb://localhost:27017/engine';
let redisUrl = 'redis://localhost:6379/15';

let storage = new MongoStorage(mongoUrl);
let redis = new RedisChannel(redisUrl);
let pubsub = new RedisChannel(redisUrl);

storage
  .init()
  .then(() => redis.init())
  .then(() => pubsub.init(true))
  .then(() => {

    let options = {
      collections: {
        auths: {
          client: false
        },
        users: {
          client: true,
          preload: {}
        }
      },
      projections: {
        users: {
          collectionName: 'auths',
          fields: {
            _id: true,
            email: true,
            name: true
          }
        }
      },
      clientStorage: false
    }

    let store = new Store(storage, redis, pubsub, options);

    store.hook = (op, session, params, done) => {
      //console.log('hook', op.type, session, params)
      if (op.type === 'del') {
        //return done('some error');
      }

      done();
    }

    let httpServer = http.createServer();
    let app = require('./server/app')(store, httpServer, mongoUrl);
    app.ws('/', (client, req) => {
      let channel = new ServerSocketChannel(client, req);
      store.client(channel);
    });

    httpServer.on('request', app);

    httpServer.listen(port, (err) => {
      if (err) {
        console.error('Can\'t start server, Error:', err);
      } else {
        console.info(`${process.pid} listening. Go to: http://localhost:${port}`);
      }
    });
  });
