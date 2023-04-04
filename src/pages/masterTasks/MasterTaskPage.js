import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useParams, NavLink } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import MasterTask from "./MasterTask";
import { Container } from "react-bootstrap";

function MasterTaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: task }] = await Promise.all([
          axiosReq.get(`/master-tasks/${id}`),
        ]);
        setTask({ results: [task] });
        console.log(task);
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

      <Row>
        <Col className="text-right mt-3">
          <NavLink to="/assigned-to/create">
            <i className="fas fa-plus-square"></i>Assign Task
          </NavLink>
        </Col>
      </Row>
    </Container>
  );
}

export default MasterTaskPage;
