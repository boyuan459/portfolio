import React from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'

import withAuth from '../components/hoc/withAuth'

class Owner extends React.Component {
  render() {
    const { auth } = this.props
    return (
      <BaseLayout {...auth}>
        <BasePage>
          Owner Page
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withAuth('siteOwner')(Owner)