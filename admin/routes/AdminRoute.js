import Relay from 'react-relay'

export default class extends Relay.Route {
  static queries = {
    users: () => Relay.QL`query { users }`
  }
  static routeName = 'AdminRoute'
}
