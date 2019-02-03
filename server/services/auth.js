const jwt = require('express-jwt');
const jwksClient = require('jwks-rsa');

//middleware
exports.checkJWT = jwt({
  secret: jwksClient.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 15,
    jwksUri: 'https://boyuan.au.auth0.com/.well-known/jwks.json'
  }),
  audience: 'bYr0WNI1meVp3MoDGghY70LlCoOBMZnY',
  issuer: 'https://boyuan.au.auth0.com/',
  algorithms: ['RS256']
})