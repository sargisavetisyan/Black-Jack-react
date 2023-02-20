import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Outlet } from 'react-router-dom';
import LayoutStyle from './Layout.module.css';

export const Layout: React.FC = React.memo((): JSX.Element => {

    let activeClassName: string = "nav-link d-flex align-items-center  me-4 pe-3 ps-3  border  border-warning rounded text-decoration-none text-white";
    let deActiveClassName: string = "nav-link d-flex align-items-center  me-4 pe-3 ps-3 hover-white text-decoration-none text-secondary";

    return (
        <>
            <Navbar
                collapseOnSelect
                expand="lg"
                bg="dark"
                variant="dark"
            >
                <Container>
                    <NavLink className={LayoutStyle.logo}
                        to="/">
                        <img
                            style={{ width: '50px' }}
                            src={require('../../images/logo.png')}
                            alt='logo'
                        />
                    </NavLink>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? activeClassName : deActiveClassName
                                }
                                to=""
                            >
                                Home
                            </NavLink>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? activeClassName : deActiveClassName
                                }
                                to="blackjack"
                            >
                                BlackJack
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </>
    )
})