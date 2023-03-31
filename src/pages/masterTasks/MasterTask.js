import React from "react";
import { Accordion, Button, Col, Row } from "react-bootstrap";
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
    <Accordion defaultActiveKey="0">
      {/* Add if statement for defaultActiveKey="0" */}
      <Card>
        <Card.Header>
          <Row>
            <Col className="mt-3">
              <Card.Title>{task_name}</Card.Title>
            </Col>

            <Col className="text-right">
              {is_owner && TaskPage && (
                <i className="fas fa-ellipsis-vertical"></i>
              )}
              {!TaskPage && (
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  <i className="fas fa-chevron-down"></i>
                </Accordion.Toggle>
              )}
            </Col>
          </Row>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
            {/*
            Need to consider the number for the event key
            Maybe ID but the defaultActiveKey does not work
            */}
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
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default MasterTask;
