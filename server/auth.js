const options = {
  passport: {
    userProperty: 'userId'
  },
  strategies: {
    facebook: {
      strategy: require('passport-facebook').Strategy,
      conf: {
        clientID: process.env.FACEBOOK_KEY,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.BASE_URL + '/auth/facebook/callback',
        authorizationURL: process.env.FACEBOOK_URL,
        profileFields: process.env.FACEBOOK_FIELDS.split(','),
        scope: process.env.FACEBOOK_SCOPE.split(',')
      }
    }
  }
}

export default {
  options
}
