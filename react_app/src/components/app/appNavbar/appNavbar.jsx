import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import styled from 'styled-components';

const StyledNavbar = styled(Navbar)`
  max-height: 50px;
  height: 8vh;
`;

const AppNavbar = props => {
  return (
    <StyledNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavDropdown alignRight title={props.identity} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={props.handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  );
};

export default AppNavbar;
