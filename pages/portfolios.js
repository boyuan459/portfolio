import React from 'react'
import { Card, CardHeader, CardText, CardBody,
  CardTitle, Button, Row, Col } from 'reactstrap'
import BaseLayout from '../components/layouts/BaseLayout'
import axios from 'axios'
import {Link} from '../routes'
import BasePage from '../components/BasePage'

class Portfolio extends React.Component {
  static async getInitialProps() {
    console.log('I am portfolio get initialProps')
    let posts = []

    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
      posts = res.data;
    } catch(err) {
      console.log(err)
    }
  
    return {
      posts: posts.slice(0,10)
    }
  }

  renderPosts() {
    const { posts } = this.props;
    return (
      <Row>
        {posts.map((item,idx) => (
          <Col key={idx} md="4">
            <Card className="portfolio-card">
              <CardHeader className="portfolio-card-header">Header</CardHeader>
              <CardBody>
                <p className="portfolio-card-city">Some location</p>
                <CardTitle className="portfolio-card-title">Special Title Treatment</CardTitle>
                <CardText className="portfolio-card-text">With supporting text below as a natural lead-in to additional content.</CardText>
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
        {this.renderPosts()}
        </BasePage>
      </BaseLayout>
    )
  }
}

export default Portfolio