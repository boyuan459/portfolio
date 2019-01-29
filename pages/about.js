import React from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'

class About extends React.Component {
  render() {
    const { auth } = this.props
    return (
      <BaseLayout {...auth}>
        <BasePage className="about-page">
        About Page
        </BasePage>
      </BaseLayout>
    )
  }
}

export default About