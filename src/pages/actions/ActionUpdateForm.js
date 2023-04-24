import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Card } from "react-bootstrap";

import { axiosReq } from "../../api/axiosDefaults";

function ActionUpdateForm(props) {
  // const { id, status, action_title, assigned_to, category } = props;
  const { id, status } = props;

  const [errors, setErrors] = useState({});

//   const [actionData, setActionData] = useState({
//     action_required: "",
//     action_description: "",
//     status: "",
//   });

//   const actionRequiredInput = useRef(null);

//   const { action_required, action_description } = setActionData;

//   const handleChange = (event) => {
//     setActionData({
//       ...actionData,
//       [event.target.name]: event.target.value,
//     });
//   };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    // formData.append("action_title", action_title);
    // formData.append("assigned_to", assigned_to);
    // formData.append("category", category);
    // formData.append("image", null);
    formData.append("status", "Closed");

    try {
      await axiosReq.put(`/actions/${id}/`, formData);
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
                {/* <Form.Group as={Row}>
                  <Form.Label column sm="5">
                    Further Action requried
                  </Form.Label>
                  <Col sm={5}>
                    <Form.Control
                      as="select"
                      name="action_required"
                      value={action_required}
                      onChange={handleChange}
                      ref={actionRequiredInput}
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </Form.Control>
                  </Col>
                </Form.Group>

                {action_required && (
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Action Description</Form.Label>
                    <Form.Control
                      type="teatarea"
                      name="action_description"
                      value={action_description}
                      onChange={handleChange}
                    />
                    <Form.Text className="text-muted">
                      Add a description of the issue raised and the action
                      requried.
                    </Form.Text>
                  </Form.Group>
                )} */}

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
