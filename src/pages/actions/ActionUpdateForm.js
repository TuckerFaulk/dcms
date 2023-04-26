import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Card } from "react-bootstrap";

import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ActionUpdateForm(props) {
  const { id, status, action_title, assigned_to, category, setAction } = props;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("action_title", action_title);
    formData.append("assigned_to", assigned_to);
    formData.append("category", category);
    formData.append("status", "Closed");

    try {
      await axiosReq.put(`/actions/${id}/`, formData);
      history.push("/my-actions");
      setAction((prevAction) => ({
        ...prevAction,
        results: prevAction.results.map((action) => {
          return action.id === id
            ? {
                ...action,
                assigned_to: assigned_to,
                category: category,
                status: "Closed",
              }
            : action;
        }),
      }));
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Container>
      {status === "Open" && (
        <Card.Footer>
          <Row>
            <Col>
              <Form onSubmit={handleSubmit}>
                <Button variant="primary" type="submit">
                  Close Action
                </Button>
              </Form>
            </Col>
          </Row>
        </Card.Footer>
      )}
    </Container>
  );
}

export default ActionUpdateForm;
