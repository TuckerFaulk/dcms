import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import MasterTask from "./MasterTask";
import { Container } from "react-bootstrap";
import AssignedToCreateForm from "../assignedTo/AssignedToCreateForm";
import AssignedTo from "../assignedTo/AssignedTo";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

function MasterTaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState({ results: [] });
  const [assignedTo, setAssignedTo] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: task }, { data: assignedTo }] = await Promise.all([
          axiosReq.get(`/master-tasks/${id}`),
          axiosReq.get(`/assigned-to/?task_name=${id}`),
        ]);
        setTask({ results: [task] });
        setAssignedTo(assignedTo);
        console.log(assignedTo)
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
          <AssignedToCreateForm
            {...task.results[0]}
            setAssignedTo={setAssignedTo}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <InfiniteScroll
            children={assignedTo?.results.map((user) => (
              <AssignedTo
                {...user}
                key={user.id}
                setAssignedTo={setAssignedTo}
              />
            ))}
            dataLength={assignedTo.results.length}
            loader={<Asset spinner />}
            hasMore={!!assignedTo.next}
            next={() => fetchMoreData(assignedTo, setAssignedTo)}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default MasterTaskPage;
