import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
import styles from "../../styles/Task.module.css";

const UserTask = (props) => {
  const {
    id,
    task_name,
    description,
    category,
    due_date,
    is_overdue,
    frequency,
    image,
    status,
    TaskPage,
  } = props;

  return (
    <Card>
      <Card.Header>
        <Row>
          <Col className="mt-3">
            {TaskPage ? (
              <Card.Title>{task_name}</Card.Title>
            ) : (
              <Card.Title>
                { task_name } - { frequency } - { due_date }
              </Card.Title>
            )}
          </Col>

          <Col
            xs
            lg="2"
            className="d-flex justify-content-end align-items-center"
          >
            {status === "Open" && is_overdue && (
              <>
                <i className="fa-solid fa-circle-exclamation text-danger"></i>
              </>
            )}
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
                  <ul className="list-group list-group-horizontal mt-1">
                    <li className={`${styles.ListGroup} list-group-item`}>
                      Category
                    </li>
                    <li className="list-group-item">{category}</li>
                  </ul>
                </Col>
                <Col>
                  <ul className="list-group list-group-horizontal mt-1">
                    <li className={`${styles.ListGroup} list-group-item`}>
                      Frequency
                    </li>
                    <li className="list-group-item">{frequency}</li>
                  </ul>
                </Col>
              </Row>
              <Row>
                <Col>
                  <ul className="list-group list-group-horizontal mt-1">
                    <li className={`${styles.ListGroup} list-group-item`}>
                      Due Date
                    </li>
                    <li className="list-group-item">{due_date}</li>
                  </ul>
                </Col>
                <Col>
                  <ul className="list-group list-group-horizontal mt-1">
                    <li className={`${styles.ListGroup} list-group-item`}>
                      Status
                    </li>
                    <li className="list-group-item">{status}</li>
                  </ul>
                </Col>
              </Row>
              {description && (
                <ul className="list-group mt-1">
                  <li className={`${styles.ListGroup} list-group-item`}>
                    Description
                  </li>
                  <li className="list-group-item">{description}</li>
                </ul>
              )}
              {image && (
                <ul className="list-group mt-1">
                  <li className={`${styles.ListGroup} list-group-item`}>
                    Image
                  </li>
                  <li className="list-group-item">
                    <Image src={image} rounded />
                  </li>
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
