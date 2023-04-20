import React, { useEffect, useState, useRef } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";

function ActionsCreateForm(props) {
  const { id } = props;

  const [errors, setErrors] = useState({});
  const [profiles, setProfiles] = useState();
  const [categories, setCategories] = useState();
  const [dueDate, setDueDate] = useState(new Date());
  const [actionData, setActionData] = useState({
    action_title: "",
    category: "",
    description: "",
    assigned_to: "",
    risk_rating: "",
  });

  const { action_title, category, description, assigned_to, risk_rating } = actionData;

  const categoryInput = useRef(null);
  const riskRatingInput = useRef(null);
  const assignedToInput = useRef(null);

  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: profiles }, { data: categories }] = await Promise.all([
          axiosReq.get(`/profiles/`), // Filter profiles to "users" only
          axiosReq.get(`/categories/`),
        ]);
        console.log(profiles)
        console.log(categories)

        setProfiles(profiles);
        setCategories(categories);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, []); // Dont know whether I need to add anything in here?

  const handleChange = (event) => {
    setActionData({
      ...actionData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("action_title", action_title);
    formData.append("description", description);
    formData.append("assigned_to", assignedToInput.current.value);
    formData.append("category", categoryInput.current.value);
    formData.append("due_date", dueDate);
    formData.append("risk_rating", riskRatingInput.current.value);

    try {
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      await axiosReq.post("/actions/", formData);
      history.push("/actions");
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
                  <Form.Label>Action Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="action_title"
                    value={action_title}
                    onChange={handleChange}
                  />
                </Form.Group>
                {/* {errors?.task_name?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))} */}

                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Action Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    rows={3}
                    value={description}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>
                    Assign To
                  </Form.Label>
                  <Col>
                    <Form.Control
                      as="select"
                      name="assigned_to"
                      value={assigned_to}
                      onChange={handleChange}
                      ref={assignedToInput}
                    >
                      {profiles?.results.map((profile) => (
                        <option value={profile.id} key={profile.id}>
                          {profile.owner}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
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
                      <option value={category.id}>
                        {category.category_name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>
                    Due Date
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="date"
                      name="due_date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Risk Rating</Form.Label>
                  <Form.Control
                    as="select"
                    name="risk_rating"
                    value={risk_rating}
                    onChange={handleChange}
                    ref={riskRatingInput}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
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

export default ActionsCreateForm;
