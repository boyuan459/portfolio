import React from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'

class CV extends React.Component {
  render() {
    const { auth } = this.props
    return (
      <BaseLayout {...auth}>
        <BasePage>
          CV Page
        </BasePage>
      </BaseLayout>
    )
  }
}

export default CV