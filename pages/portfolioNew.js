import React from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'

import withAuth from '../components/hoc/withAuth'
import PortfolioCreateForm from '../components/portfolios/PortfolioCreateForm'
import { Row, Col } from 'reactstrap'
import { createPortfolio } from '../actions'
import { Router } from '../routes'

const INITIAL_VALUES = {
  title: '',
  company: '',
  location: '',
  position: '',
  description: '',
  startDate: '',
  endDate: ''
}

class PortfolioNew extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      error: undefined
    }

    this.savePortfolio = this.savePortfolio.bind(this)
  }

  savePortfolio(values, { setSubmitting}) {
    setSubmitting(true)
    console.log('Create portfolio ',values)
    createPortfolio(values)
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
    const { auth } = this.props
    return (
      <BaseLayout {...auth}>
        <BasePage className="portfolio-create-page">
          <h2>Create New Portfolio</h2>
          <Row>
            <Col md={6}>
              <PortfolioCreateForm initialValues={INITIAL_VALUES} error={this.state.error} onSubmit={this.savePortfolio} />
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withAuth('siteOwner')(PortfolioNew)