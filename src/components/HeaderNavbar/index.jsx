import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function HeaderNavbar(props) {
  return (
    <Navbar fixed="top" variant="light" bg="primary">
      <Container className="justify-content-center">
        { 
          props.prev ?
          (<Button className="position-absolute start-0 text-light ps-3"
            onClick={props.prev}>
            <FontAwesomeIcon icon="chevron-left"/>
          </Button>) : null
        }
        <Navbar.Brand href="#" className="text-light m-0">
          {props.title}
          <span className="fs-6">{props.subtitle}</span>
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}
