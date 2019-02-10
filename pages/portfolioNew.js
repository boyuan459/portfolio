import React from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'

import withAuth from '../components/hoc/withAuth'
import PortfolioCreateForm from '../components/portfolios/PortfolioCreateForm'
import { Row, Col } from 'reactstrap'
import { createPortfolio } from '../actions'

class PortfolioNew extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      error: ''
    }

    this.savePortfolio = this.savePortfolio.bind(this)
  }

  savePortfolio(values) {
    console.log('Create portfolio ',values)
    createPortfolio(values)
    .then(data => {
      console.log(data)
    }).catch(err => {
      this.setState({
        error: err.message
      })
      console.error(err)
    })
  }

  render() {
    const { auth } = this.props
    return (
      <BaseLayout {...auth}>
        <BasePage className="portfolio-create-page">
          <h2>Create New Portfolio</h2>
          <Row>
            <Col md={6}>
              <PortfolioCreateForm error={this.state.error} onSubmit={this.savePortfolio} />
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withAuth('siteOwner')(PortfolioNew)