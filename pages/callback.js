import React from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'

import auth0 from '../services/auth0'
import { withRouter } from 'next/router'

class Auth0Callback extends React.Component {

  async componentDidMount() {
    const result = await auth0.handleAuthentication()
    console.log('Auth0', result)
    this.props.router.push('/')
  }

  render() {
    return (
      <BaseLayout>
        <BasePage>
          <h1> You are logged in</h1>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withRouter(Auth0Callback)