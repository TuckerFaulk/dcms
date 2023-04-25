import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { NavLink } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Container, Form } from "react-bootstrap";
import MasterTask from "./MasterTask";

import styles from "../../styles/SearchBar.module.css";

function MasterTasksPage() {
  const [masterTasks, setMasterTasks] = useState({ results: [] });
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/master-tasks/?search=${query}`);
        console.log(data)
        setMasterTasks(data);
      } catch (err) {
        console.log(err);
      }
    };

    const timer = setTimeout(() => {
      handleMount();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [masterTasks, query]);

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
      <Row>
        <Col className="text-right">
          <NavLink to="/master-tasks/create">
            <i className="fas fa-plus-square"></i>Add Task
          </NavLink>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          {masterTasks?.results.map((task) => (
            <MasterTask {...task} />
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default MasterTasksPage;
