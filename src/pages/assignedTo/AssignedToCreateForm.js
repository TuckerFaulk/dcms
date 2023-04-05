import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Card } from "react-bootstrap";

import styles from "../../styles/AssignedToCreateForm.module.css";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function AssignedToCreateForm() {
  const [openForm, setOpenForm] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  return (
    <Form>
      <Container>
        {!openForm ? (
          <Row>
            <Col className="d-flex justify-content-end ">
              <Button
                onClick={() => handleOpenForm()}
                className="btn btn-light"
              >
                <i className="fas fa-plus-square"></i>Assign Task
              </Button>
            </Col>
          </Row>
        ) : (
          <Row>
            <Card>
              <Card.Body className={styles.Card}>
                <Form>
                  <Row>
                    <Col sm={3}>
                      <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="5">
                          Assign To
                        </Form.Label>
                        <Col sm="7">
                          <Form.Control as="select" />
                        </Col>
                      </Form.Group>
                    </Col>

                    <Col sm={4}>
                      <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                          Initial Due Date
                        </Form.Label>
                        <Col sm="2">
                          <DatePicker
                            dateFormat="dd/MM/yyyy"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                          />
                        </Col>
                      </Form.Group>
                    </Col>

                    <Col sm={4}>
                      <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="5">
                          To Be Completed By
                        </Form.Label>
                        <Col>
                          <Form.Control as="select" name="frequency">
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </Form.Control>
                        </Col>
                      </Form.Group>
                    </Col>

                    <Col className="d-flex justify-content-end" sm={1}>
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
    </Form>
  );
}

export default AssignedToCreateForm;
