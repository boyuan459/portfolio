import React from 'react'
import { Card, CardHeader, CardText, CardBody,
  CardTitle, Button, Row, Col } from 'reactstrap'
import BaseLayout from '../components/layouts/BaseLayout'
import { getPortfolios } from '../actions'
import {Link} from '../routes'
import BasePage from '../components/BasePage'

class Portfolio extends React.Component {
  static async getInitialProps({req}) {
    console.log('I am portfolio get initialProps')
    let portfolios = []

    try {
      portfolios = await getPortfolios(req)
    } catch(err) {
      console.log(err)
    }
  
    return {
      portfolios: portfolios
    }
  }

  renderPortfolios() {
    const { portfolios } = this.props;
    return (
      <Row>
        {portfolios.map((item,idx) => (
          <Col key={idx} md="4">
            <Card className="portfolio-card">
              <CardHeader className="portfolio-card-header">{item.position}</CardHeader>
              <CardBody>
                <p className="portfolio-card-city">{item.location}</p>
                <CardTitle className="portfolio-card-title">{item.title}</CardTitle>
                <CardText className="portfolio-card-text">{item.description}</CardText>
                <div className="readmore"></div>
              </CardBody>
            </Card>
          </Col>
          ))}
      </Row>
    )
  }

  render() {
    const { auth } = this.props
    return (
      <BaseLayout {...auth}>
        <BasePage className="portfolio-page">
        {this.renderPortfolios()}
        </BasePage>
      </BaseLayout>
    )
  }
}

export default Portfolio