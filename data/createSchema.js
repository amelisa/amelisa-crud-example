import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'

function createSchema (resolve) {
  let Item = new GraphQLObjectType({
    name: 'Item',
    fields: () => ({
      id: {
        type: GraphQLString
      },
      name: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      },
      owner: {
        type: GraphQLString,
        resolve (parent) {
          let { userId } = parent
          if (!userId) return
          return resolve('users', userId)
        }
      }
    })
  })

  let User = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
      id: {
        type: GraphQLString
      },
      name: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      items: {
        type: new GraphQLList(Item),
        resolve (parent, args) {
          let { id } = parent
          return resolve('items', {userId: id})
        }
      }
    })
  })

  let Viewer = new GraphQLObjectType({
    name: 'Viewer',
    fields: () => ({
      id: {
        type: GraphQLString
      },
      name: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      users: {
        type: new GraphQLList(User),
        resolve (parent, args) {
          return resolve('users', {})
        }
      }
    })
  })

  let RootType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      viewer: {
        type: Viewer,
        args: {
          id: { type: GraphQLString }
        },
        resolve: (parent, args) => {
          let { id } = args
          return resolve('users', id)
        }
      }
    })
  })

  let schema = new GraphQLSchema({
    query: RootType
  })

  return schema
}

export default createSchema
