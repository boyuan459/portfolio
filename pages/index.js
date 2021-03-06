import React from "react";
import { Row, Col, Container } from "reactstrap";
import BaseLayout from "../components/layouts/BaseLayout";
import Typed from 'react-typed';

class Index extends React.Component {
  static async getInitialProps() {
    console.log("I am get initialProps");

    return {};
  }

  state = {
    title: "I am index title"
  };
  constructor(props) {
    super(props);
    this.roles = ["Full Stack Developer", "React.js", "Node.js", "MySQL", "DynamoDB", "MongoDB", "ElasticSearch"];
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  handleTitleChange = () => {
    this.setState({
      title: "Change title"
    });
  };

  render() {
    const {posts, auth} = this.props;

    return (
      <BaseLayout className="cover" {...auth} headerType="index">
        <div className="main-section">
          <div className="background-image">
            <img src="/static/images/background-index.png" />
          </div>

          <Container>
            <Row>
              <Col md="6">
                <div className="hero-section">
                  <div className={`flipper`}>
                    <div className="back">
                      <div className="hero-section-content">
                        <h2> Full Stack Developer </h2>
                        <div className="hero-section-content-intro">
                          Have a look at my portfolio and job history.
                        </div>
                      </div>
                      <img
                        className="image"
                        src="/static/images/section-1.png"
                      />
                      <div className="shadow-custom">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6" className="hero-welcome-wrapper">
                <div className="hero-welcome-text">
                  <h1>
                    Welcome to the portfolio website of Bo Yuan. Get
                    informed, collaborate and discover projects I was working on
                    through the years!
                  </h1>
                  <Typed
                    strings={this.roles}
                    typeSpeed={40}
                    backSpeed={50}
                    showCursor
                    cursorChar="|"
                    className="self-typed"
                    loop >
                    <input type="text" />
                  </Typed>
                </div>
                <div className="hero-welcome-bio">
                  <h1>Let's take a look on my work.</h1>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </BaseLayout>
    );
  }
}

export default Index;
