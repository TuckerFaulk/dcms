import React from "react";
import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
// import { useCurrentUser } from "../../contexts/CurrentUserContext";

const UserTask = (props) => {
  const {
    id,
    task_name,
    description,
    category,
    // assigned_to,
    // created_at,
    // updated_at,
    due_date,
    // is_overdue,
    frequency,
    // action_required,
    // action_description,
    // image,
    status,
    TaskPage,
  } = props;

  // const currentUser = useCurrentUser();

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
        </>
      )}
    </Card>
  );
};

export default UserTask;
