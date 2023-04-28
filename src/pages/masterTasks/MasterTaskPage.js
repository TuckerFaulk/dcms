import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import MasterTask from "./MasterTask";
import AssignedToCreateForm from "../assignedTo/AssignedToCreateForm";
import AssignedTo from "../assignedTo/AssignedTo";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import { useHistory } from "react-router-dom";
import btnStyles from "../../styles/Button.module.css";
import { useRedirect } from "../../hooks/useRedirect";

/**
 * Display single master task details
 */
function MasterTaskPage() {
  useRedirect("loggedOut");
  const { id } = useParams();
  const [task, setTask] = useState({ results: [] });
  const [assignedTo, setAssignedTo] = useState({ results: [] });

  const history = useHistory();

  /**
   * Retrieve singular master task data.
   * Retrieve assigned to data associated to master task.
   */
  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: task }, { data: assignedTo }] = await Promise.all([
          axiosReq.get(`/master-tasks/${id}`),
          axiosReq.get(`/assigned-to/?task_name=${id}`),
        ]);
        setTask({ results: [task] });
        setAssignedTo(assignedTo);
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Container>
      <Row className="d-flex justify-content-end pb-3">
        <Button
          className={`${btnStyles.Button} ${btnStyles.Blue}`}
          onClick={() => history.push("/master-tasks")}
        >
          Back
        </Button>
      </Row>

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
