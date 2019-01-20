import React from 'react'
import axios from 'axios'
import BaseLayout from '../components/layouts/BaseLayout'

class Index extends React.Component {

  static async getInitialProps() {
    console.log('I am get initialProps')
  
    return {
      
    }
  }

  state = {
    title: 'I am index title'
  }
  constructor() {
    super()
    console.log("Constructor")
  }

  componentDidMount() {
    console.log('componentDidMount')
  }

  componentDidUpdate() {
    console.log('componentDidUpdate')
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
  }

  handleTitleChange = () => {
    this.setState({
      title: 'Change title'
    })
  }

  render() {
    const posts = this.props.posts
    console.log(posts)
    return (
      <BaseLayout>
        <h2>Index Page</h2>
        <h3>{this.state.title}</h3>
        <button onClick={this.handleTitleChange}>Change title</button>
      </BaseLayout>
    )
  }
}

export default Index