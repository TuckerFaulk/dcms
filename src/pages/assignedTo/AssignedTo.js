import React from "react";
import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { MoreDropdown } from "../../components/MoreDropdown";
import { axiosRes } from "../../api/axiosDefaults";

const AssignedTo = (props) => {
  const {
    id,
    owner,
    assigned_to_username,
    initial_due_date,
    completed_by,
    setAssignedTo,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/assigned-to/${id}/`);
      setAssignedTo((prevAssignedTo) => ({
        ...prevAssignedTo,
        results: prevAssignedTo.results.filter(
          (assigned) => assigned.id !== id
        ),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card>
      <Card.Header>
        <Row>
          <Col className="mt-3">
            <Card.Title>
              {assigned_to_username} - {initial_due_date} - {completed_by}
            </Card.Title>
          </Col>

          <Col className="d-flex justify-content-end align-items-center">
            {is_owner && (
              <MoreDropdown
                handleDelete={handleDelete}
              />
            )}
          </Col>
        </Row>
      </Card.Header>
    </Card>
  );
};

export default AssignedTo;
