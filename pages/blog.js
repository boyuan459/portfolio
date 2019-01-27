import React from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'

class Blog extends React.Component {

  static getInitialProps() {
    console.log('I am blog getInitialProps')
    return {
      initialData: [1,2,3,4]
    }
  }

  render() {
    return (
      <BaseLayout>
        <BasePage>
          Blog Page
        </BasePage>
      </BaseLayout>
    )
  }
}

export default Blog