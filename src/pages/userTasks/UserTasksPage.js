import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { axiosReq } from "../../api/axiosDefaults";
import { Container } from "react-bootstrap";
import UserTask from "./UserTask";

function UserTasksPage() {
  const [userTasks, setUserTasks] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get("/user-tasks/");
        console.log(data)
        setUserTasks(data);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, []); // Dont know whether I need to add anything in here?

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
