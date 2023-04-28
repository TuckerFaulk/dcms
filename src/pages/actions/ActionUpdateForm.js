import React from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useRedirect } from "../../hooks/useRedirect";

/**
 * Render ActionUpdateForm.
 * Supply user with input fields to close an action.
 */
function ActionUpdateForm(props) {
  useRedirect("loggedOut");
  const { id, status, action_title, assigned_to, category, setAction } = props;

  const history = useHistory();

  /**
   * Push data to API.
   */
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
          return action.id === id ? {
                ...action,
                assigned_to: assigned_to,
                category: category,
                status: "Closed",
              }
            : action;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Container>
      {status === "Open" && (
        <Card.Footer>
          <Row>
            <Col className="d-flex justify-content-center">
              <Form onSubmit={handleSubmit}>
                <Button
                  className={`${btnStyles.Button} ${btnStyles.Blue}`}
                  type="submit"
                >
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
