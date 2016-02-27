import { MongoStorage, RedisChannel, Store } from 'amelisa/server'

const options = {
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

let storage = new MongoStorage(process.env.MONGO_URL)
let sub = new RedisChannel(process.env.REDIS_URL)
let pub = new RedisChannel(process.env.REDIS_URL, true)

let store = new Store(storage, sub, pub, options)

store.init = () => Promise.all([
  storage.init(),
  sub.init(),
  pub.init()
])

export default store
