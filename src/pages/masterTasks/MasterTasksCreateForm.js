import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function MasterTasksCreateForm() {
  const [errors, setErrors] = useState({});

  const [masterTaskData, setMasterTaskData] = useState({
    task_name: "",
    description: "",
    category: "",
    frequency: "",
  });

  const { task_name, description, category, frequency } = masterTaskData;

  const handleChange = (event) => {
    setMasterTaskData({
      ...masterTaskData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Form>
      <Row>
        <Col className="py-2 p-0 p-md-2">
          <Container className="d-flex flex-column justify-content-center">
            <div className="text-center">
              <Form>
                <Form.Group controlId="formBasicTaskName">
                  <Form.Label>Task Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="task_name"
                    value={task_name}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Task Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    rows={3}
                    value={description}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    name="category"
                    value={category}
                    onChange={handleChange}
                  >
                    <option>Default select</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Frequency</Form.Label>
                  <Form.Control
                    as="select"
                    name="frequency"
                    value={frequency}
                    onChange={handleChange}
                  >
                    <option>Once</option>
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Bi-annually</option>
                    <option>Annually</option>
                  </Form.Control>
                </Form.Group>
              </Form>

              <Button type="submit">Create</Button>
              <Button onClick={() => {}}>Cancel</Button>
            </div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default MasterTasksCreateForm;
