import React from 'react';

// const Index = () => {
//   return (
//     <div>Index Page</div>
//   )
// }

class Index extends React.Component {
  render() {
    return (
      <div>
        <h2>Index Page</h2>
        <a href="/">Home</a>
        <a href="/blog">Blog</a>
        <a href="/cv">CV</a>
        <a href="/portfolio">Portfolio</a>
      </div>
    )
  }
}

export default Index