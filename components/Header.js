import React from 'react'
import Link from 'next/link'

class Header extends React.Component {
  render() {
  
    return (
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/blog">
          <a>Blog</a>
        </Link>
        <Link href="/cv">
          <a>CV</a>
        </Link>
        <Link href="/portfolios">
          <a>Portfolio</a>
        </Link>
        <style jsx>{`
          a {
            font-size: 20px;
          }
        `}</style>
      </div>
    )
  }
}

export default Header