import React, {useState} from 'react';
import {Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const Header = (props) => {
  const HeaderLinks = styled.div`
    a {
      display: inline-block;
      padding: 0 20px;
      margin: 0 10px;
      font-size: 18px;
      color: red;
      text-decoration: none;
      background: white;
      border-radius: 5px;
    }
  `;

  const Brand = styled.div`
    a {
      display: inline-block;
      padding: 0 20px;
      margin: 0 10px;
      font-size: 30px;
      color: black;
      text-decoration: none;
      background: white;
      border-radius: 5px;
    }
  `;

  return (
    <>
      <Navbar>
        <Brand>
          <NavbarBrand href="/">RandoMarvel</NavbarBrand>
        </Brand>

        <Nav tabs>
          <HeaderLinks>
            {/* <Link to="/">Main</Link> */}
            {props.linkArray}
          </HeaderLinks>
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
