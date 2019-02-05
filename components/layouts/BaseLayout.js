import React from 'react'
import Header from '../Header'

const BaseLayout = (props) => {

  const { className, children, isAuthenticated, headerType = 'default' } = props
  return (
    <div className="layout-container">
      { headerType === 'index' ? <Header className="port-nav-index" isAuthenticated={isAuthenticated} /> : <Header className="port-nav-default" isAuthenticated={isAuthenticated} />}
      <main className={`cover ${className||''}`}>
        <div className="wrapper">
          {children}
        </div>
      </main>
    </div>
  )
}

export default BaseLayout