import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap'
import './header.css';
import {Link} from 'react-router-dom'

const Header = () => {

    return (
        <>
            <Navbar>
                <NavbarBrand href="/">RandoMarvel</NavbarBrand>
                <Nav tabs>
                    <NavItem >
                        <Link to="/comics/">Comics</Link>
                    </NavItem>

                    <NavItem >
                        <Link to="/comics/">Autors</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/comics/">About</Link>
                    </NavItem>
                </Nav>
            </Navbar>

        </>
    )
}

export default Header