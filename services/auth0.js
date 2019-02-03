import auth0 from 'auth0-js'
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import axios from 'axios'

class Auth {

  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'boyuan.au.auth0.com',
      clientID: 'bYr0WNI1meVp3MoDGghY70LlCoOBMZnY',
      redirectUri: 'http://localhost:3000/callback',
      responseType: 'token id_token',
      scope: 'openid profile'
    });
    this.login = this.login.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          resolve(authResult)
        } else if (err) {
          console.log(err);
          reject(err)
        }
      });
    })
    
  }

  setSession(authResult) {
    // Set isLoggedIn flag in localStorage
    // localStorage.setItem('isLoggedIn', 'true');

    // Set the time that the access token will expire at
    const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();

    Cookie.set('user', authResult.idTokenPayload)
    Cookie.set('jwt', authResult.idToken)
    Cookie.set('expiresAt', expiresAt)

    // navigate to the home route
    // history.replace('/home');
  }

  logout() {
    Cookie.remove('user')
    Cookie.remove('jwt')
    Cookie.remove('expiresAt')

    this.auth0.logout({
      returnTo: '',
      clientID: 'bYr0WNI1meVp3MoDGghY70LlCoOBMZnY'
    })
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = Cookie.get('expiresAt')
    return new Date().getTime() < expiresAt;
  }

  async getJWKS() {
    const res = await axios.get('https://boyuan.au.auth0.com/.well-known/jwks.json')
    const jwks = res.data
    return jwks;
  }

  async verifyToken(token) {
    // console.log('verifyToken', token)
    if (token) {
      const decodedToken = jwt.decode(token, {complete: true})
      // console.log('decodedToken kid', decodedToken.header.kid)
      const jwks = await this.getJWKS();
      // console.log('jwks', jwks)
      // console.log('jwtToken', decodedToken)
      const jwk = jwks.keys[0]
      // console.log('jwk kid', jwk.kid)
      //build certificate
      let cert = jwk.x5c[0]
      cert = cert.match(/.{1,64}/g).join('\n')
      cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`
 
      if (jwk.kid === decodedToken.header.kid) {
        // console.log('cert')
        // console.log(cert)
        try {
          const verifiedToken = jwt.verify(token, cert)
          // console.log('verifiedToken',verifiedToken)
          const expiresAt = verifiedToken.exp * 1000

          return (verifiedToken && new Date().getTime() < expiresAt) ? verifiedToken : undefined
        } catch (err) {
          console.log('verifiedToken error', err)
          return undefined
        }
      }
    }

    return undefined
  }

  async clientAuth() {
    const token = Cookie.get('jwt')
    const verifiedToken = await this.verifyToken(token)
    return verifiedToken
  }

  async serverAuth(req) {
    // console.log('serverAuth', req.headers.cookie)
    if (req.headers.cookie) {
      const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
      // console.log('jwtCookie', jwtCookie)
      if (!jwtCookie) return undefined

      const token = jwtCookie.split('=')[1]
      const verifiedToken = await this.verifyToken(token)
      return verifiedToken
    }
  }
}

const auth0Client = new Auth()

export default auth0Client