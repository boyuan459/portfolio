import React from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'

import withAuth from '../components/hoc/withAuth'
import PortfolioCreateForm from '../components/portfolios/PortfolioCreateForm'
import { Row, Col } from 'reactstrap'

class PortfolioNew extends React.Component {

  constructor(props) {
    super(props)

    this.savePortfolio = this.savePortfolio.bind(this)
  }

  savePortfolio(values) {
    console.log(values)
  }

  render() {
    const { auth } = this.props
    return (
      <BaseLayout {...auth}>
        <BasePage className="portfolio-create-page">
          <h2>Create New Portfolio</h2>
          <Row>
            <Col md={6}>
              <PortfolioCreateForm onSubmit={this.savePortfolio} />
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withAuth('siteOwner')(PortfolioNew)