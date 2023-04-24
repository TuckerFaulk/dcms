import React from "react";
import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";

const Action = (props) => {
  const {
    id,
    action_title,
    category_name,
    description,
    // assigned_to,
    // created_at,
    // updated_at,
    due_date,
    // is_overdue,
    risk_rating,
    // image,
    status,
    ActionPage,
  } = props;

  return (
    <Card>
      <Card.Header>
        <Row>
          <Col className="mt-3">
            <Card.Title>{action_title}</Card.Title>
          </Col>

          <Col className="d-flex justify-content-end align-items-center">
            {!ActionPage && (
              <NavLink to={`/my-actions/${id}`}>
                <i className="fas fa-circle-info"></i>
              </NavLink>
            )}
          </Col>
        </Row>
      </Card.Header>

      {ActionPage && (
        <>
          <Card.Body>
            <Card.Text>
              <Row>
                <Col>
                  <ul className="list-group list-group-horizontal">
                    <li className="list-group-item bg-primary text-white">
                      Category
                    </li>
                    <li className="list-group-item">{category_name}</li>
                  </ul>
                </Col>
                <Col>
                  <ul className="list-group list-group-horizontal">
                    <li className="list-group-item bg-primary text-white">
                      Risk Rating
                    </li>
                    <li className="list-group-item">{risk_rating}</li>
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

export default Action;
