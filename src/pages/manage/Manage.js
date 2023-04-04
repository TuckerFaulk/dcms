import React from "react";
import { Card } from "react-bootstrap";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { NavLink } from "react-router-dom";
import styles from '../../styles/Manage.module.css'

function ManagePage() {
  return (
    <Row>
      <Col className="d-flex justify-content-center align-items-center ">
        <Card style={{ width: "18rem" }} className={styles.card}>
          <Card.Body>
            <NavLink to="/categories/">
              Categories<i className="fas fa-arrow-right"></i>
            </NavLink>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }} className={styles.card}>
          <Card.Body>
            <NavLink to="/master-tasks/">
              Master Tasks<i className="fas fa-arrow-right"></i>
            </NavLink>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }} className={styles.card}>
          <Card.Body>
            <NavLink to="/actions/">
              Actions<i className="fas fa-arrow-right"></i>
            </NavLink>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default ManagePage;
