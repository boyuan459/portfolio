import React from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import { withRouter } from 'next/router'
import axios from 'axios'
import BasePage from '../components/BasePage'

class Portfolio extends React.Component {

  static async getInitialProps({query}) {
    console.log('Portfolio ', query)
    const id = query.id;
    let portfolio = {}
    try {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      portfolio = res.data;
    } catch(err) {
      console.log(err)
    }
    return {portfolio}
  }

  render() {
    const { portfolio, auth } = this.props

    return (
      <BaseLayout {...auth}>
        <BasePage>
        Portfolio Page
        <h2>{ portfolio.title }</h2>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withRouter(Portfolio)