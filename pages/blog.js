import React from 'react'
import BaseLayout from '../components/layouts/BaseLayout'

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
        Blog Page
      </BaseLayout>
    )
  }
}

export default Blog