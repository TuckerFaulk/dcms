import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import MasterTask from "./MasterTask";

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
    <Row>
      <Col>
        <MasterTask {...task.results[0]} TaskPage />
        {/* <AssignedTo /> */}
      </Col>
    </Row>
  );
}

export default MasterTaskPage;
