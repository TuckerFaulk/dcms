import React from "react";
import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const MasterTask = (props) => {
  const {
    id,
    task_name,
    owner,
    created_at,
    updated_at,
    category,
    description,
    frequency,
    TaskPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col>
            <Card.Title>{task_name}</Card.Title>
          </Col>
          <Col className="text-right">{is_owner && TaskPage && <p>...</p>}</Col>
        </Row>

        <Row>
          <Col>
            <ul class="list-group list-group-horizontal">
              <li class="list-group-item bg-primary text-white">Category</li>
              <li class="list-group-item">{category}</li>
            </ul>
          </Col>
          <Col>
            <ul class="list-group list-group-horizontal">
              <li class="list-group-item bg-primary text-white">Frequency</li>
              <li class="list-group-item">{frequency}</li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col>
            <ul class="list-group list-group-horizontal">
              <li class="list-group-item bg-primary text-white">Created</li>
              <li class="list-group-item">{created_at}</li>
            </ul>
          </Col>
          <Col>
            <ul class="list-group list-group-horizontal">
              <li class="list-group-item bg-primary text-white">Updated</li>
              <li class="list-group-item">{updated_at}</li>
            </ul>
          </Col>
        </Row>

        <Card.Text>
          {description && (
            <ul class="list-group">
              <li class="list-group-item bg-primary text-white">Description</li>
              <li class="list-group-item">{description}</li>
            </ul>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MasterTask;
