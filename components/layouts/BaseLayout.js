import React from 'react'

const BaseLayout = (props) => {

  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  )
}

export default BaseLayout