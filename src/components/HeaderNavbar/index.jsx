import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

export default function HeaderNavbar(props) {
  return (
    <Navbar fixed="top" variant="light" bg="primary">
      <Container className="justify-content-center">
        <Navbar.Brand href="#home" className="text-light fw-bold m-0">
          {props.title}
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}
