import React from 'react'
import Link from 'next/link'

class Header extends React.Component {
  render() {
    debugger
    const { title } = this.props

    return (
      <div>
        {title}
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/blog">
          <a>Blog</a>
        </Link>
        <Link href="/cv">
          <a>CV</a>
        </Link>
        <Link href="/portfolio">
          <a>Portfolio</a>
        </Link>
      </div>
    )
  }
}

export default Header