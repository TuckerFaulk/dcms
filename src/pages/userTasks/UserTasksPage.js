import React, { useEffect, useRef, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { axiosReq } from "../../api/axiosDefaults";
import { Container } from "react-bootstrap";
import UserTask from "./UserTask";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useCurrentProfile } from "../../contexts/CurrentProfileContext";
import StatusFilter from "../../components/StatusFilter";

function UserTasksPage() {
  const [userTasks, setUserTasks] = useState({ results: [] });
  const [status, setStatus] = useState("Open");

  const currentUser = useCurrentUser();

  const currentProfile = useCurrentProfile();

  useEffect(() => {
    const handleMount = async () => {
      if (currentProfile?.is_staff) {
        try {
          const { data } = await axiosReq.get(
            `/user-tasks/?completed_by=Admin&status=${status}`
          );
          console.log(data);
          setUserTasks(data);
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const { data } = await axiosReq.get(
            `/user-tasks/?assigned_to__assigned_to__profile=${currentUser?.pk}&completed_by=User&status=${status}`
          );
          console.log(data);
          setUserTasks(data);
        } catch (err) {
          console.log(err);
        }
      }
    };

    handleMount();
  }, [currentUser, currentProfile, status]); // Dont know whether I need to add anything in here?

  return (
    <Container>
      
      <StatusFilter status={status} setStatus={setStatus} />

      <Row className="mt-3">
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
