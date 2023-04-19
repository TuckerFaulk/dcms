import React, { useEffect, useState, useRef } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Card } from "react-bootstrap";

import styles from "../../styles/AssignedToCreateForm.module.css";

import { axiosReq } from "../../api/axiosDefaults";

function AssignedToCreateForm(props) {
  const { id } = props;

  const [errors, setErrors] = useState({});
  const [openForm, setOpenForm] = useState(false);
  const [profiles, setProfiles] = useState();
  const [initialDueDate, setInitialDueDate] = useState(new Date());
  const [assignedToData, setAssignedToData] = useState({
    assigned_to: "",
    completed_by: "",
  });

  const completedByInput = useRef(null);
  const assignedToInput = useRef(null);

  const { assigned_to, completed_by } = assignedToData;

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get("/profiles/"); // Filter profiles to "users" only
        setProfiles(data);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, []); // Dont know whether I need to add anything in here?

  const handleChange = (event) => {
    setAssignedToData({
      ...assignedToData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("task_name", id);
    formData.append("assigned_to", assignedToInput.current.value);
    formData.append("initial_due_date", initialDueDate);
    formData.append("completed_by", completedByInput.current.value);

    try {
      for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
      await axiosReq.post("/assigned-to/", formData);
      setOpenForm(false);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Container>
      {!openForm ? (
        <Row>
          <Col className="d-flex justify-content-end ">
            <Button onClick={() => setOpenForm(true)} className="btn btn-light">
              <i className="fas fa-plus-square"></i>Assign Task
            </Button>
          </Col>
        </Row>
      ) : (
        <Row>
          <Card>
            <Card.Body className={styles.Card}>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col sm={3}>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Assign To
                      </Form.Label>
                      <Col sm="8">
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
                  </Col>

                  <Col sm={4}>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Initial Due Date
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="date"
                          name="initial_due_date"
                          value={initialDueDate}
                          onChange={(e) => setInitialDueDate(e.target.value)}
                        />
                      </Col>
                    </Form.Group>
                  </Col>

                  <Col sm={4}>
                    <Form.Group as={Row}>
                      <Form.Label column sm="5">
                        To Be Completed By
                      </Form.Label>
                      <Col sm={5}>
                        <Form.Control
                          as="select"
                          name="completed_by"
                          value={completed_by}
                          onChange={handleChange}
                          ref={completedByInput}
                        >
                          <option value="User">User</option>
                          <option value="Admin">Admin</option>
                        </Form.Control>
                      </Col>
                    </Form.Group>
                  </Col>

                  <Col
                    className="d-flex align-items-center justify-content-end"
                    sm={1}
                  >
                    <Button variant="primary" type="submit">
                      Create
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Row>
      )}
    </Container>
  );
}

export default AssignedToCreateForm;
