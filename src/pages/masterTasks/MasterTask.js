import React from "react";
import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
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
      <Card.Header>
        <Row>
          <Col className="mt-3">
            <Card.Title>{task_name}</Card.Title>
          </Col>

          <Col className="d-flex justify-content-end align-items-center">
            {!TaskPage && (
              <NavLink to={`/master-tasks/${id}`}>
                <i className="fas fa-circle-info"></i>
              </NavLink>
            )}

            {is_owner && <i className="fas fa-ellipsis-vertical"></i>}
          </Col>
        </Row>
      </Card.Header>
      {TaskPage && (
        <Card.Body>
          <Card.Text>
            <Row>
              <Col>
                <ul class="list-group list-group-horizontal">
                  <li class="list-group-item bg-primary text-white">
                    Category
                  </li>
                  <li class="list-group-item">{category}</li>
                </ul>
              </Col>
              <Col>
                <ul class="list-group list-group-horizontal">
                  <li class="list-group-item bg-primary text-white">
                    Frequency
                  </li>
                  <li class="list-group-item">{frequency}</li>
                </ul>
              </Col>
            </Row>
            <Row>
              <Col>
                <ul class="list-group list-group-horizontal">
                  <li class="list-group-item bg-primary text-white">
                    Date Created
                  </li>
                  <li class="list-group-item">{created_at}</li>
                </ul>
              </Col>
              <Col>
                <ul class="list-group list-group-horizontal">
                  <li class="list-group-item bg-primary text-white">
                    Date Updated
                  </li>
                  <li class="list-group-item">{updated_at}</li>
                </ul>
              </Col>
            </Row>
            {description && (
              <ul class="list-group">
                <li class="list-group-item bg-primary text-white">
                  Description
                </li>
                <li class="list-group-item">{description}</li>
              </ul>
            )}
          </Card.Text>
        </Card.Body>
      )}
    </Card>
  );
};

export default MasterTask;
