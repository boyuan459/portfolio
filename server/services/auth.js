const jwt = require('express-jwt');
const jwksClient = require('jwks-rsa');

const namespace = 'http://localhost:3000/'

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

exports.checkRole = role => (req, res, next) => {
  const user = req.user;
  if (user && user[namespace + "role"] === role) {
    next();
  } else {
    return res.status(401).send({
      title: "Not Authorized",
      desc: "You are not authorized to access this data"
    });
  }
};