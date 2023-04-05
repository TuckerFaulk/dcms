import React from "react";
import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const AssignedTo = (props) => {
  const {
    id,
    owner,
    task_name,
    assigned_to,
    initial_due_date,
    completed_by,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <Card>
      <Card.Header>
        <Row>
          <Col className="mt-3">
            <Card.Title>{assigned_to}</Card.Title>
          </Col>

          <Col className="d-flex justify-content-end align-items-center">
            {is_owner && <i className="fas fa-ellipsis-vertical"></i>}
          </Col>
        </Row>
      </Card.Header>
    </Card>
  );
};

export default AssignedTo;
