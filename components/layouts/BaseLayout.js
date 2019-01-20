import React from 'react'
import Header from '../Header'

import '../../styles/main.scss'

const BaseLayout = (props) => {

  return (
    <React.Fragment>
      <Header />
      {props.children}
    </React.Fragment>
  )
}

export default BaseLayout