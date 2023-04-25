import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useHistory } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentProfile } from "../../contexts/CurrentProfileContext";

const Action = (props) => {
  const {
    id,
    action_title,
    category_name,
    description,
    assigned_to_username,
    // created_at,
    // updated_at,
    due_date,
    is_overdue,
    risk_rating,
    image,
    status,
    ActionPage,
  } = props;

  const currentUser = useCurrentUser();
  const currentProfile = useCurrentProfile();
  const is_owner = currentUser?.username === assigned_to_username;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/my-actions/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      axiosRes.delete(`/actions/${id}`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card>
      <Card.Header>
        <Row>
          <Col className="mt-3">
            <Card.Title>{action_title}</Card.Title>
          </Col>

          <Col className="d-flex justify-content-end align-items-center">
            {status === "Open" && is_overdue && (
                <i class="fa-solid fa-circle-exclamation text-danger"></i>
            )}
            {!ActionPage && (
              <NavLink to={`/my-actions/${id}`}>
                <i className="fas fa-circle-info"></i>
              </NavLink>
            )}
            {ActionPage && (is_owner || currentProfile?.is_staff) && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
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
              {image && (
                <ul className="list-group">
                  <li className="list-group-item bg-primary text-white">
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

export default Action;
