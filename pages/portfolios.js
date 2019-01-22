import React from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import axios from 'axios'
import Link from 'next/link'

class Portfolio extends React.Component {
  static async getInitialProps() {
    console.log('I am portfolio get initialProps')
    let posts = []

    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
      posts = res.data;
    } catch(err) {
      console.log(err)
    }
  
    return {
      posts: posts.slice(0,10)
    }
  }

  renderPosts() {
    const { posts } = this.props;
    return (
      <ul>
        {posts.map((item,idx) => (
          <li key={idx}>
            <Link as={`/portfolio/${item.id}`} href={`/portfolio?id=${item.id}`}>
              <a>{item.title}</a>
            </Link>
          </li>))}
      </ul>
    )
  }

  render() {
    
    return (
      <BaseLayout>
        Portfolio List Page
        {this.renderPosts()}
      </BaseLayout>
    )
  }
}

export default Portfolio