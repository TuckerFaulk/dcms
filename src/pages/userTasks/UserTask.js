import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const UserTask = (props) => {
  const {
    id,
    task_name,
    description,
    category,
    assigned_to,
    // created_at,
    // updated_at,
    due_date,
    // is_overdue,
    frequency,
    action_required,
    action_description,
    // image,
    status,
    TaskPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_assigned_to = currentUser?.username === assigned_to;

  return (
    <Card>
      <Card.Header>
        <Row>
          <Col className="mt-3">
            <Card.Title>{task_name}</Card.Title>
          </Col>

          <Col className="d-flex justify-content-end align-items-center">
            {!TaskPage && (
              <NavLink to={`/my-tasks/${id}`}>
                <i className="fas fa-circle-info"></i>
              </NavLink>
            )}

            {is_assigned_to && <i className="fas fa-ellipsis-vertical"></i>}
            {/* dont need the above as task should only be seen if assigned to them */}
          </Col>
        </Row>
      </Card.Header>
      {TaskPage && (
        <>
          <Card.Body>
            <Card.Text>
              <Row>
                <Col>
                  <ul className="list-group list-group-horizontal">
                    <li className="list-group-item bg-primary text-white">
                      Category
                    </li>
                    <li className="list-group-item">{category}</li>
                  </ul>
                </Col>
                <Col>
                  <ul className="list-group list-group-horizontal">
                    <li className="list-group-item bg-primary text-white">
                      Frequency
                    </li>
                    <li className="list-group-item">{frequency}</li>
                  </ul>
                </Col>
              </Row>
              <Row>
                <Col>
                  <ul className="list-group list-group-horizontal">
                    <li className="list-group-item bg-primary text-white">
                      Due Date
                    </li>
                    <li className="list-group-item">{due_date}</li>
                  </ul>
                </Col>
                <Col>
                  <ul className="list-group list-group-horizontal">
                    <li className="list-group-item bg-primary text-white">
                      Status
                    </li>
                    <li className="list-group-item">{status}</li>
                  </ul>
                </Col>
              </Row>
              {description && (
                <ul className="list-group">
                  <li className="list-group-item bg-primary text-white">
                    Description
                  </li>
                  <li className="list-group-item">{description}</li>
                </ul>
              )}
            </Card.Text>
          </Card.Body>

          {/* Only show the below section if the user task is open */}
          {status === "open" && (
            <Card.Footer>
              <Row>
                <Col>
                  <Form>
                    <Form.Group as={Row} controlId="formBasicCheckbox">
                      <Form.Label column sm="2">
                        Action required
                      </Form.Label>
                      <Col sm={5}>
                        <Form.Check type="checkbox" />
                      </Col>
                    </Form.Group>

                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Action Description</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                          Add a description of the issue raised and the action
                          requried.
                        </Form.Text>
                      </Form.Group>

                    <Form.Group as={Row}>
                      <Form.Label column sm="5">
                        Status
                      </Form.Label>
                      <Col sm={5}>
                        <Form.Control
                          as="select"
                          name="status"
                          // value={completed_by}
                          // onChange={handleChange}
                          // ref={completedByInput}
                        >
                          <option value="user">Open</option>
                          <option value="closed">Close</option>
                        </Form.Control>
                      </Col>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Card.Footer>
          )}
        </>
      )}
    </Card>
  );
};

export default UserTask;
