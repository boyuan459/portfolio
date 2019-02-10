import React from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'

import withAuth from '../components/hoc/withAuth'
import PortfolioCreateForm from '../components/portfolios/PortfolioCreateForm'
import { Row, Col } from 'reactstrap'
import { getPortfolioById, updatePortfolio } from '../actions'
import { Router } from '../routes'

class PortfolioEdit extends React.Component {

  static async getInitialProps({query}) {
    let portfolio = {}

    try {
      portfolio = await getPortfolioById(query.id)
    } catch(error) {
      console.error(error)
    }

    return { portfolio }
  }

  constructor(props) {
    super(props)

    this.state = {
      error: undefined
    }

    this.savePortfolio = this.savePortfolio.bind(this)
  }

  savePortfolio(values, { setSubmitting}) {
    setSubmitting(true)
    debugger
    console.log('Create portfolio ',values)
    updatePortfolio(values)
    .then(data => {
      setSubmitting(false)
      console.log(data)
      this.setState({
        error: undefined
      })
      Router.pushRoute('/portfolios')
    }).catch(err => {
      setSubmitting(false)
      const error = err.message || 'Server error'
      this.setState({
        error: error
      })
    })
  }

  render() {
    const { auth, portfolio } = this.props
    return (
      <BaseLayout {...auth}>
        <BasePage className="portfolio-create-page">
          <h2>Update Portfolio</h2>
          <Row>
            <Col md={6}>
              <PortfolioCreateForm initialValues={portfolio} error={this.state.error} onSubmit={this.savePortfolio} />
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withAuth('siteOwner')(PortfolioEdit)