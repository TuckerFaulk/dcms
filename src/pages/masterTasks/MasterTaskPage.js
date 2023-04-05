import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useParams, NavLink } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import MasterTask from "./MasterTask";
import { Container } from "react-bootstrap";
import AssignedToCreateForm from "../assignedTo/AssignedToCreateForm";

function MasterTaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState({ results: [] });
  const [assignedTo, setAssignedTo] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: task }, {data: assignedTo}] = await Promise.all([
          axiosReq.get(`/master-tasks/${id}`),
          axiosReq.get(`/assigned-to/?task_name=${id}`),
        ]);
        setTask({ results: [task] });
        setAssignedTo(assignedTo)
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
          <MasterTask {...task.results[0]} TaskPage />
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <AssignedToCreateForm />
        </Col>
      </Row>

      <Row>
        <Col>
        {/* <AssignTo /> */}
        </Col>
      </Row>
    </Container>
  );
}

export default MasterTaskPage;
