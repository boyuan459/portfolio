import React from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'

import withAuth from '../components/hoc/withAuth'

class About extends React.Component {

  static getInitialProps() {
    const superSecretValue = 'secret'
    return {
      superSecretValue
    }
  }

  render() {
    const { auth, superSecretValue } = this.props
    return (
      <BaseLayout {...auth}>
        <BasePage className="about-page">
        About Page
        <h3>{superSecretValue}</h3>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withAuth(About)