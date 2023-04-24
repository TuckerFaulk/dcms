import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Container } from "react-bootstrap";
import Action from "./Action";
import ActionUpdateForm from "./ActionUpdateForm";

function ActionPage() {
  const { id } = useParams();
  const [action, setAction] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: action }] = await Promise.all([
          axiosReq.get(`/actions/${id}`),
        ]);
        setAction({ results: [action] });
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
          <Action {...action.results[0]} ActionPage />
        </Col>
      </Row>
      <Row>
        <Col>
          <ActionUpdateForm {...action.results[0]} />
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

export default ActionPage;