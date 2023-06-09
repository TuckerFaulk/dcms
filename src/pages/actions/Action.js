import React from "react";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useHistory } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentProfile } from "../../contexts/CurrentProfileContext";
import styles from "../../styles/Action.module.css";

/**
 * Display single action content.
 */
const Action = (props) => {
  const {
    id,
    action_title,
    category_name,
    description,
    assigned_to_username,
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

  /**
   * Route user to Edit page.
   */
  const handleEdit = () => {
    history.push(`/my-actions/${id}/edit`);
  };

  /**
   * Delete selected action from API
   */
  const handleDelete = async () => {
    try {
      axiosRes.delete(`/actions/${id}`);
      history.push("/my-actions");
    } catch (err) {
      // console.log(err);
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
                <i className="fa-solid fa-circle-exclamation text-danger"></i>
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
                  <ul className="list-group list-group-horizontal mt-1">
                    <li className={`${styles.ListGroup} list-group-item`}>
                      Category
                    </li>
                    <li className="list-group-item">{category_name}</li>
                  </ul>
                </Col>
                <Col>
                  <ul className="list-group list-group-horizontal mt-1">
                    <li className={`${styles.ListGroup} list-group-item`}>
                      Risk Rating
                    </li>
                    <li className="list-group-item">{risk_rating}</li>
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
                  <li className="list-group-item text-center">
                    <Image className={`${styles.ActionImage}`} src={image} rounded />
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
