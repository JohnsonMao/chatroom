import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

FooterNavbar.propTypes = {
  navList: PropTypes.array.isRequired
}

export default function FooterNavbar(props) {

  let { navList } = props;

  navList = navList.filter(item => !item.hide);

  return (
    <>
      <Navbar fixed="bottom" bg="light" className="p-0">
        <Container>
          <Nav justify className="w-100" as="ul">
            {
              navList.map( item => (
              <Nav.Item key={item.component} as="li">
                <NavLink to={item.path}>
                  <FontAwesomeIcon icon={item.icon}/>
                  <p className="m-0">{ item.text }</p>
                </NavLink>
              </Nav.Item>
              ))
            }
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}
