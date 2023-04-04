import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { NavLink } from "react-router-dom";

function ActionsPage() {
  return (
    <Row>
      <Col className="text-right">
        <NavLink to="/actions/create">
          <i className="fas fa-plus-square"></i>Add Action
        </NavLink>
      </Col>
    </Row>
  );
}

export default ActionsPage;
