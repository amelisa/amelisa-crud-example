import { MongoStorage, RedisPubsub, Store } from 'amelisa/server'

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
let pubsub = new RedisPubsub(process.env.REDIS_URL)

let store = new Store(storage, pubsub, options)

store.init = () => Promise.all([
  storage.init(),
  pubsub.init()
])

export default store
