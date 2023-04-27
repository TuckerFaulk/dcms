import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useHistory } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/MasterTask.module.css";

const MasterTask = (props) => {
  const {
    id,
    task_name,
    owner,
    created_at,
    updated_at,
    category_name,
    description,
    frequency,
    TaskPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/master-tasks/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      axiosRes.delete(`/master-tasks/${id}`);
      history.goBack();
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Card>
      <Card.Header>
        <Row>
          <Col className="mt-3">
            {TaskPage ? (
              <Card.Title>{task_name}</Card.Title>
            ) : (
              <Card.Title>
                {category_name} - {task_name}
              </Card.Title>
            )}
          </Col>

          <Col className="d-flex justify-content-end align-items-center">
            {!TaskPage && (
              <NavLink to={`/master-tasks/${id}`}>
                <i className="fas fa-circle-info"></i>
              </NavLink>
            )}

            {TaskPage && is_owner && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </Col>
        </Row>
      </Card.Header>
      {TaskPage && (
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
                    Date Created
                  </li>
                  <li className="list-group-item">{created_at}</li>
                </ul>
              </Col>
              <Col>
                <ul className="list-group list-group-horizontal mt-1">
                  <li className={`${styles.ListGroup} list-group-item`}>
                    Date Updated
                  </li>
                  <li className="list-group-item">{updated_at}</li>
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
          </Card.Text>
        </Card.Body>
      )}
    </Card>
  );
};

export default MasterTask;
