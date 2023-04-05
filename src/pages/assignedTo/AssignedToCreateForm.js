import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Card } from "react-bootstrap";

import styles from "../../styles/AssignedToCreateForm.module.css";

function AssignedToCreateForm() {
  const [openForm, setOpenForm] = useState(false);

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  return (
    <Form>
      <Container>
        {!openForm ? (
          <Row>
            <Col className="d-flex justify-content-end ">
              <Button onClick={() => handleOpenForm()} className="btn btn-light">
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
                    <Col sm={2}>
                      <Form.Control
                        plaintext
                        readOnly
                        defaultValue="<Task Name>"
                      />
                    </Col>

                    <Col sm={4}>
                      <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="5">
                          Assigned To
                        </Form.Label>
                        <Col sm="7">
                          <Form.Control
                            as="select"
                          />
                        </Col>
                      </Form.Group>
                    </Col>

                    <Col sm={4}>
                      <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="5">
                          Initial Due Date
                        </Form.Label>
                        <Col sm="7">

                        </Col>
                      </Form.Group>
                    </Col>

                    {/* Completed By */}

                    <Col sm={2}>
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
