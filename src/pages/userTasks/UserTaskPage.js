import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Container } from "react-bootstrap";
import UserTask from "./UserTask";
import UserTaskUpdateForm from "./UserTaskUpdateForm";

function UserTaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: task }] = await Promise.all([
          axiosReq.get(`/user-tasks/${id}`),
        ]);
        setTask({ results: [task] });
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Container>
      <Row>
        <Col>
          <UserTask {...task.results[0]} TaskPage />
        </Col>
      </Row>
      <Row>
        <Col>
          <UserTaskUpdateForm {...task.results[0]} />
        </Col>
      </Row>
      <Row>
        <Col>
          {/* Add comments section */}
        </Col>
      </Row>
    </Container>
  );
}

export default UserTaskPage;