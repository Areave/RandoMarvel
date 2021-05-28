import React, {useState} from 'react';
import {Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import './header.css';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const Header = (props) => {
  const HeaderLinks = styled.div`
    a {
      display: inline-block;
      margin: 0 20px;
      font-size: 23px;
      color: green;
      text-decoration: none;
    }
  `;

  return (
    <>
      <Navbar>
        <NavbarBrand href="/">RandoMarvel</NavbarBrand>

        <Nav tabs>
          <HeaderLinks>
            <Link to="/">Main</Link>
            {props.linkArray}
          </HeaderLinks>
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
