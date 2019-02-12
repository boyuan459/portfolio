import React from 'react'
import {
  Card, CardHeader, CardText, CardBody,
  CardTitle, Button,
} from 'reactstrap'

class PortfolioCard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { portfolio, children } = this.props
    return (
      <Card className="portfolio-card">
        <CardHeader className="portfolio-card-header">{portfolio.position}</CardHeader>
        <CardBody>
          <p className="portfolio-card-city">{portfolio.location}</p>
          <CardTitle className="portfolio-card-title">{portfolio.title}</CardTitle>
          <CardText className="portfolio-card-text">{portfolio.description}</CardText>
          <div className="readmore"></div>
          {children}
        </CardBody>
      </Card>
    )
  }
}

export default PortfolioCard