import React, { useState } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import './header.css';
import { Link } from 'react-router-dom';
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
      text-decoration:none;
    }
  `;

  return (
    <>
      <Navbar>
        <NavbarBrand href="/">RandoMarvel</NavbarBrand>

        <Nav tabs>
          {/* <NavItem>
            <NavLink toggle={toggle} active={isActive} href="/comics/">
              Comics
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="/">Main</NavLink>
          </NavItem> */}

          {/* <NavItem>
            <NavLink href="/">Active</NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="/comics/">Main</NavLink>
          </NavItem> */}

          <HeaderLinks>
            <Link to="/">Main</Link>
            <Link to="/test/">Test</Link>
            <Link to="/pers/">Pers</Link>
            <Link to="/comics/">Comics</Link>
            {/* <Link to="/comics/page1/page2/somelink">longSomeLink</Link>
            <Link to="/comics/somelink">Somelink</Link> */}

          </HeaderLinks>
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
