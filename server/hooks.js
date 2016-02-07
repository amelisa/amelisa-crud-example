import store from './store'

store.hook = async (op, session, params) => {
  let { type, collectionName, docId } = op

  // some code that runs before op is applied
  // good place for validation and access control
}

store.afterHook = async (op, session, params) => {
  let { type, collectionName, docId } = op

  // some code that runs after op is applied
}
