import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { NavLink } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Container } from "react-bootstrap";
import MasterTask from "./MasterTask";

function MasterTasksPage() {
  const [masterTasks, setMasterTasks] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get("/master-tasks/");
        console.log(data)
        setMasterTasks(data);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [masterTasks]);

  return (
    <Container>
      <Row>
        <Col className="text-right">
          <NavLink to="/master-tasks/create">
            <i className="fas fa-plus-square"></i>Add Task
          </NavLink>
        </Col>
      </Row>
      <Row>
        <Col>
          {masterTasks?.results.map((task) => (
            <MasterTask {...task} />
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default MasterTasksPage;
