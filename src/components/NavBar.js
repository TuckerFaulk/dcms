import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";

import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { useCurrentProfile } from "../contexts/CurrentProfileContext";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const currentProfile = useCurrentProfile();

  const { expanded, setExpended, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      // console.log(err);
    }
  };

  const addAdminIcons = (
    <>
      <NavLink to="/master-tasks/" activeClassName={styles.Active}>
        <i className="fas fa-gear"></i>Master Tasks
      </NavLink>
      <NavLink to="/categories/" activeClassName={styles.Active}>
        <i className="fas fa-gear"></i>Categories
      </NavLink>
    </>
  );

  const userLoggedInIcons = (
    <>
      <NavLink to="/my-tasks" activeClassName={styles.Active}>
        <i className="fas fa-list-check"></i>My Tasks
      </NavLink>
      <NavLink to="/my-actions" activeClassName={styles.Active}>
        <i className="fas fa-person-running"></i>My Actions
      </NavLink>
      <NavLink to="/" onClick={handleSignOut}>
        <i className="fas fa-sign-out-alt"></i>Sign Out
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink to="/" exact activeClassName={styles.Active}>
        <i className="fas fa-home"></i> Home
      </NavLink>
      <NavLink to="/signin" activeClassName={styles.Active}>
        <i className="fas fa-sign-in-alt"></i>Sign In
      </NavLink>
      <NavLink to="/signup" activeClassName={styles.Active}>
        <i className="fas fa-user-plus"></i>Sign Up
      </NavLink>
    </>
  );

  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top"
    >
      <Container>
        <NavLink to="/">
          <Navbar.Brand><i id={styles.LogoIcon} className="fa-regular fa-square-check"></i>DCMS</Navbar.Brand>
        </NavLink>
        <Navbar.Toggle
          onClick={() => setExpended(!expanded)}
          ref={ref}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            {currentUser && currentProfile?.is_staff && addAdminIcons}
            {currentUser ? userLoggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
