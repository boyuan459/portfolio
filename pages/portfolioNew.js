import React from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'

import withAuth from '../components/hoc/withAuth'
import PortfolioCreateForm from '../components/portfolios/PortfolioCreateForm'

class PortfolioNew extends React.Component {
  render() {
    const { auth } = this.props
    return (
      <BaseLayout {...auth}>
        <BasePage className="portfolio-create-page">
          <h2>Create New Portfolio</h2>
          <PortfolioCreateForm />
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withAuth('siteOwner')(PortfolioNew)