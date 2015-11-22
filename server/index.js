import http from 'http'
import { MongoStorage, RedisChannel, ServerSocketChannel, Store } from 'amelisa'
import { Server as WebSocketServer } from 'ws'
import getApp from './getApp'

const port = 3000
const mongoUrl = 'mongodb://localhost:27017/amelisa'
const redisUrl = 'redis://localhost:6379/15'

let storage = new MongoStorage(mongoUrl)
let redis = new RedisChannel(redisUrl)
let pubsub = new RedisChannel(redisUrl)

storage
  .init()
  .then(() => redis.init())
  .then(() => pubsub.init(true))
  .then(() => {
    let options = {
      version: 1,
      collections: {
        auths: {
          client: false
        },
        users: {
          client: true
        },
        items: {
          client: true
        }
      },
      preloads: [
        ['users', {}]
      ],
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
      clientStorage: true
    }

    let store = new Store(storage, redis, pubsub, options)

    store.hook = (op, session, params, done) => {
      done()
    }

    let server = http.createServer()

    let app = getApp(store, mongoUrl)
    server.on('request', app)

    let wsServer = new WebSocketServer({server})

    wsServer.on('connection', (socket) => {
      let channel = new ServerSocketChannel(socket, socket.upgradeReq)
      store.onChannel(channel)
    })

    server.listen(port, (err) => {
      if (err) {
        console.error('Can\'t start server, Error:', err)
      } else {
        console.info(`${process.pid} listening. Go to: http://localhost:${port}`)
      }
    })
  })
