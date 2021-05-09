import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap'
import './header.css';

const Header = () => {

    return (
        <>
            <Navbar>
                <NavbarBrand href="/">RandoMarvel</NavbarBrand>
                <Nav tabs>
                    <NavItem >
                        <NavLink href="#">Comics</NavLink>
                    </NavItem>

                    <NavItem >
                        <NavLink href="#">Stories</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">About</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>

        </>
    )
}

export default Header