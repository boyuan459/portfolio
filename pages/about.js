import React from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'

import withAuth from '../components/hoc/withAuth'

// import { getSecretData, getSecretDataServer } from '../actions'
import { getSecretData } from '../actions'

class About extends React.Component {

  static async getInitialProps({req}) {
    // const anotherData = process.browser ? await getSecretData() : await getSecretDataServer(req)
    const anotherData = await getSecretData(req)

    return {
      anotherData
    }
  }

  async componentDidMount() {
    const data = await getSecretData()
    
    this.setState({
      data
    })
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

export default withAuth()(About)