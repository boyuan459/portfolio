import auth0 from 'auth0-js'
import Cookie from 'js-cookie'

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
}

const auth0Client = new Auth()

export default auth0Client