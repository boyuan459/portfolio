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
  render() {
    const { posts } = this.props
    
    return (
      <BaseLayout>
        Portfolio List Page
        <ul>
          {posts.map((item,idx) => <li key={idx}><Link href="/portfolio"><a>{item.title}</a></Link></li>)}
        </ul>
      </BaseLayout>
    )
  }
}

export default Portfolio