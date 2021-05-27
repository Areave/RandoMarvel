import React, {useState} from 'react';
import {Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import './header.css';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  const [isActive, toggleActive] = useState(false);
  const toggle = () => toggleActive(!isActive);

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
            <Link to="/characters">Characters</Link>
            <Link to="/comics">Comics</Link>
          </HeaderLinks>
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
