import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";

function MasterTasksCreateForm() {
  const [errors, setErrors] = useState({});

  const history = useHistory();

  const [masterTaskData, setMasterTaskData] = useState({
    task_name: "",
    description: "",
    category: "",
    frequency: "",
  });

  const { task_name, description, category, frequency } = masterTaskData;

  const [categories, setCategories] = useState();

  const categoryInput = useRef(null);
  const frequencyInput = useRef(null);

  const handleChange = (event) => {
    setMasterTaskData({
      ...masterTaskData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get("/categories/");
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, []); // Dont know whether I need to add anything in here?

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("task_name", task_name);
    formData.append("description", description);
    formData.append("category", categoryInput.current.value);
    formData.append("frequency", frequencyInput.current.value);

    try {
      await axiosReq.post("/master-tasks/", formData);
      history.push("/master-tasks");
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
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
                {errors?.task_name?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}

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
                    ref={categoryInput}
                  >
                    {categories?.map((category) => (
                      <option value={category.id}>{category.category_name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Frequency</Form.Label>
                  <Form.Control
                    as="select"
                    name="frequency"
                    value={frequency}
                    onChange={handleChange}
                    ref={frequencyInput}
                  >
                    <option value="once">Once</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="bi-annually">Bi-annually</option>
                    <option value="annually">Annually</option>
                  </Form.Control>
                </Form.Group>
              </Form>

              <Button type="submit">Create</Button>
              <Button onClick={() => history.goBack()}>Cancel</Button>
            </div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default MasterTasksCreateForm;
