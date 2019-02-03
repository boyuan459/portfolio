import React from 'react'
import BaseLayout from '../layouts/BaseLayout'
import BasePage from '../BasePage'

export default function(Component) {
  return class withAuth extends React.Component {

    static async getInitialProps(args) {
      let pageProps = {}
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(args)
      }
      return { ...pageProps }
    }

    renderProtectedPage() {
      const { isAuthenticated } = this.props.auth
      if (isAuthenticated) {
        return <Component {...this.props}/>
      } else {
        return (
          <BaseLayout {...this.props}>
            <BasePage>
              You are not authorized to access this page
            </BasePage>
          </BaseLayout>
        )
      }
    }
    render() {
      return this.renderProtectedPage()
    }
  }
}