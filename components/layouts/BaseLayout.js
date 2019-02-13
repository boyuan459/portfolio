import React from 'react'
import Header from '../Header'
import Head from 'next/head'

const BaseLayout = (props) => {

  const { className, children, isAuthenticated, headerType = 'default' } = props

  return (
    <React.Fragment>
      <Head>
        <title>Portfolio</title>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous" />
      </Head>
      <div className="layout-container">
        <Header className={`port-nav-${headerType}`} isAuthenticated={isAuthenticated} />
        <main className={`cover ${className||''}`}>
          <div className="wrapper">
            {children}
          </div>
        </main>
      </div>
    </React.Fragment>
  )
}

export default BaseLayout