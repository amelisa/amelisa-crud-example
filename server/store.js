import { MongoStorage } from 'amelisa/mongo-server'
import { RedisPubsub } from 'amelisa/redis'
import { Store } from 'amelisa'

let storage = new MongoStorage(process.env.MONGO_URL)
let pubsub = new RedisPubsub(process.env.REDIS_URL)

const options = {
  version: 1,
  storage,
  pubsub,
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
        id: true,
        email: true,
        name: true
      }
    }
  }
}

let store = new Store(options)

export default store
