import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { axiosReq } from "../../api/axiosDefaults";
import { NavLink } from "react-router-dom";
import Action from "./Action";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useCurrentProfile } from "../../contexts/CurrentProfileContext";
import StatusFilter from "../../components/StatusFilter";

import styles from "../../styles/SearchBar.module.css";

function ActionsPage() {
  const [actions, setActions] = useState({ results: [] });
  const [status, setStatus] = useState("Open");
  const [query, setQuery] = useState("");

  const currentUser = useCurrentUser();
  const currentProfile = useCurrentProfile();

  useEffect(() => {
    const handleMount = async () => {

      if (currentProfile?.is_staff) {
        try {
          const { data } = await axiosReq.get(`/actions/?status=${status}&search=${query}`);
          console.log(data);
          setActions(data);
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const { data } = await axiosReq.get(`/actions/?assigned_to__profile=${currentUser?.pk}&status=${status}&search=${query}`);
          console.log(data);
          setActions(data);
        } catch (err) {
          console.log(err);
        }
      }
    };

    const timer = setTimeout(() => {
      handleMount();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentProfile, actions, status, query]); // Try to stop it refreshing

  return (
    <Container>
      <i className={`fas fa-search ${styles.SearchIcon}`} />
      <Form
        className={`${styles.SearchBar}`}
        onSubmit={(event) => event.preventDefault()}
      >
        <Form.Control
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="mr-sm-2"
          placeholder="Search..."
        />
      </Form>
      
      <StatusFilter status={status} setStatus={setStatus} />

      <Row className="mt-3">
        <Col className="text-right">
          <NavLink to="/my-actions/create">
            <i className="fas fa-plus-square"></i>Add Action
          </NavLink>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          {actions?.results.map((action) => (
            <Action {...action} ActionsPage />
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default ActionsPage;
