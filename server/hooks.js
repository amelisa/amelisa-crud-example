import store from './store'

store.clientHook = async (channel, session, params) => {
  // some code that runs after client connection
  // good place for knowing if client is online

  // let model = store.createModel()
  //
  // let { userId } = session
  //
  // model.set(['users', userId, 'online'], true)
  // model.set(['users', userId, 'lastSeen'], Date.now())
  //
  // channel.on('close', () => {
  //   model.set(['users', userId, 'online'], false)
  //   model.set(['users', userId, 'lastSeen'], Date.now())
  // })
}

store.preHook = async (op, session, params) => {
  // some code that runs before op is applied
  // good place for validation and access control

  // let { type, collectionName, docId } = op
  // let { userId } = session
  // let { server } = params
  //
  // if (collectionName === 'auths' && !server) {
  //   throw new Error('Access to auths collection is restricted from client')
  // }
  //
  // if (collectionName === 'users' && type === 'add') {
  //   throw new Error('Users adding should be done through auths collection')
  // }
  //
  // if (collectionName === 'users' && docId !== userId) {
  //   throw new Error('Users can edit only themselfs')
  // }
}

store.afterHook = async (op, session, params) => {
  // some code that runs after op is applied
  // good place to trigger some logic, like external services or sending emails

  let { type, collectionName, docId, field, value } = op
  console.log('afterHook', type, collectionName, docId, field, value)
  let model = store.createModel()

  if (type === 'add' && collectionName === 'auths') {
    let user = value
    let userId = docId

    let $user = model.doc('users', userId)
    await $user.fetch()

    // set creating date to user
    await $user.set('dateCreated', Date.now())

    // if registration with with facebook, set user fields from
    // provider data
    if (user.facebook) {
      if (user.facebook.emails && user.facebook.emails.length) {
        for (let facebookEmail of user.facebook.emails) {
          await $user.set('email', facebookEmail.value)
          break
        }
      } else if (user.facebook._json.email) {
        await $user.set('email', user.facebook._json.email)
      }

      await $user.set('name', user.facebook.name.givenName)
    }
  }
}
