import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem} from 'reactstrap';
import Link from 'next/link'

import auth0 from '../services/auth0'

const BsNavLink = (props) => {
  const { route, title } = props;
  return (
    <Link href={route}>
      <a className="nav-link port-navbar-link">{title}</a>
    </Link>
  )
}

const Login = () => {
  return (
    <span onClick={auth0.login} className="nav-link port-navbar-link">Login</span>
  )
}

const Logout = () => {
  return (
    <span onClick={auth0.logout} className="nav-link port-navbar-link">Logout</span>
  )
}

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const { isAuthenticated, className } = this.props
    return (
      <div>
        <Navbar className={`port-navbar port-nav-base absolute ${className}`} color="transparent" dark expand="md">
          <NavbarBrand className="port-navbar-brand" href="/">Bo Yuan</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="port-navbar-item">
                <BsNavLink route="/" title="Home" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink route="/about" title="About" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink route="/blog" title="Blog" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink route="/cv" title="CV" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink route="/portfolios" title="Portfolio" />
              </NavItem>
              {
                !isAuthenticated && (
                  <NavItem className="port-navbar-item">
                    <Login />
                  </NavItem>
                )
              }
              {
                isAuthenticated && (
                  <NavItem className="port-navbar-item">
                    <Logout />
                  </NavItem>
                )
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}