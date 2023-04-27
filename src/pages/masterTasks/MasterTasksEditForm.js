import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { useParams } from "react-router-dom";
import btnStyles from "../../styles/Button.module.css";
import { useRedirect } from "../../hooks/useRedirect";

function MasterTasksEditForm() {
  useRedirect('loggedOut')
  const [errors, setErrors] = useState({});

  const history = useHistory();
  const { id } = useParams();

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
        const [{ data: categories }, { data: task }] = await Promise.all([
            axiosReq.get("/categories/"),
            axiosReq.get(`/master-tasks/${id}`),
          ]);
        setCategories(categories);
        setMasterTaskData(task);
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("task_name", task_name);
    formData.append("description", description);
    formData.append("category", categoryInput.current.value);
    formData.append("frequency", frequencyInput.current.value);

    try {
      await axiosReq.put(`/master-tasks/${id}/`, formData);
      history.push(`/master-tasks/${id}/`);
    } catch (err) {
      // console.log(err);
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
                {errors?.description?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}

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
                      <option value={category.id} key={category.id}>{category.category_name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                {errors?.category?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}

                <Form.Group>
                  <Form.Label>Frequency</Form.Label>
                  <Form.Control
                    as="select"
                    name="frequency"
                    value={frequency}
                    onChange={handleChange}
                    ref={frequencyInput}
                  >
                    <option value="Once">Once</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Biannually">Bi-annually</option>
                    <option value="Annually">Annually</option>
                  </Form.Control>
                </Form.Group>
                {errors?.frequency?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
              </Form>

              <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">Update</Button>
              <Button className={`${btnStyles.Button}`} onClick={() => history.goBack()}>Cancel</Button>
            </div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default MasterTasksEditForm;
