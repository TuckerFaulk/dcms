import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";

import { useCurrentUser } from "../contexts/CurrentUserContext";

const NavBar = () => {

  const currentUser = useCurrentUser();
  const userLoggedInIcons = <>{currentUser?.username}</>;
  // const adminLoggedInIcons = <>Admin {currentUser?.username}</>;
  // Add the above later once I find out how to access is_staff
  const loggedOutIcons = (
    <>
      <NavLink to="/signin" activeClassName={styles.Active}>
        <i className="fas fa-sign-in-alt"></i> Sign In
      </NavLink>
      <NavLink to="/signup" activeClassName={styles.Active}>
        <i className="fas fa-user-plus"></i> Sign Up
      </NavLink>
    </>
  );

  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>DCMS</Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink to="/" exact activeClassName={styles.Active}>
              <i className="fas fa-home"></i> Home
            </NavLink>
            {currentUser ? userLoggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
