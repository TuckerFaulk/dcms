import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { NavLink } from "react-router-dom";

function CategoriesPage() {
  return (
    <Row>
      <Col className="text-right">
        <NavLink to="/categories/create">
          <i className="fas fa-plus-square"></i>Add Category
        </NavLink>
      </Col>
    </Row>
  );
}

export default CategoriesPage;
