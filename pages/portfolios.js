import React from 'react'
import { Card, CardHeader, CardText, CardBody,
  CardTitle, Button, Row, Col } from 'reactstrap'
import BaseLayout from '../components/layouts/BaseLayout'
import { getPortfolios } from '../actions'
import { Router } from '../routes'
import BasePage from '../components/BasePage'
import PorftolioCard from '../components/portfolios/PortfolioCard'
import PortfolioCard from '../components/portfolios/PortfolioCard';

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
    const { portfolios, auth: { isAuthenticated, isSiteOwner } } = this.props;
    return (
      <Row>
        {portfolios.map((item,idx) => (
          <Col key={idx} md="4">
            <PortfolioCard portfolio={item}>
              {
                isAuthenticated && isSiteOwner ?
                  (
                    <React.Fragment>
                      <Button onClick={() => this.editPortfolio(item)} className="portfolio-edit-btn">Edit</Button>
                      <Button>Delete</Button>
                    </React.Fragment>
                  ) : null
              }
            </PortfolioCard>
          </Col>
          ))}
      </Row>
    )
  }

  editPortfolio = (portfolio) => {
    console.log(portfolio)
    Router.pushRoute(`/portfolios/${portfolio._id}/edit`)
  }

  createPortfolio = () => {
    Router.pushRoute('/portfolioNew')
  }

  render() {
    const { auth } = this.props
    return (
      <BaseLayout {...auth}>
        <BasePage className="portfolio-page">
        {
          auth.isAuthenticated && auth.isSiteOwner ? 
          (
            <Row className="portfolio-actions-btn">
              <Col md={2}>
                <Button onClick={this.createPortfolio}>Create Portfolio</Button>
              </Col>
            </Row>
          ) : null
        }
        {this.renderPortfolios()}
        </BasePage>
      </BaseLayout>
    )
  }
}

export default Portfolio
