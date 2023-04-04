import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { NavLink } from "react-router-dom";

function MasterTasksPage() {
  return (
    <Row>
      <Col className="text-right">
        <NavLink to="/master-tasks/create">
          <i className="fas fa-plus-square"></i>Add Task
        </NavLink>
      </Col>
    </Row>
  );
}

export default MasterTasksPage;
