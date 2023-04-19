import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { axiosReq } from "../../api/axiosDefaults";
import { Container } from "react-bootstrap";
import UserTask from "./UserTask";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function UserTasksPage() {
  const [userTasks, setUserTasks] = useState({ results: [] });

  const currentUser = useCurrentUser();

  // Add completed by filter
  // If (is_staff) .get(...?completed_by=${admin}) else ?assigned_to__assigned_to__profile=${currentUser?.pk}

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/user-tasks/?assigned_to__assigned_to__profile=${currentUser?.pk}`);
        console.log(data)
        setUserTasks(data);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [currentUser]); // Dont know whether I need to add anything in here?

  return (
    <Container>
      <Row>
        <Col>
        {userTasks?.results.map((task) => (
            <UserTask {...task} />
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default UserTasksPage;
