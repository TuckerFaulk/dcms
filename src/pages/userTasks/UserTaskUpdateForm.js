import React, { useState, useRef } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Card, Image } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";
import btnStyles from "../../styles/Button.module.css";

function UserTaskUpdateForm(props) {
  const { id, status } = props;

  const [errors, setErrors] = useState({});

  const [userTaskData, setUserTaskData] = useState({
    action_required: "",
    action_description: "",
    image: "",
    status: "",
  });

  const actionRequiredInput = useRef(null);
  const imageInput = useRef(null);

  const history = useHistory();

  const { action_required, action_description, image } = userTaskData;

  const handleChange = (event) => {
    setUserTaskData({
      ...userTaskData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setUserTaskData({
        ...userTaskData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("action_required", actionRequiredInput.current.value);
    formData.append("action_description", action_description);
    formData.append("status", "Closed");

    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/user-tasks/${id}/`, formData);
      history.push("/my-tasks");
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
                <Form.Group as={Row}>
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
                )}

                <Form.Group className="text-center">
                  {image ? (
                    <>
                      <figure>
                        <Image src={image} rounded />
                      </figure>
                      <div>
                        <Form.Label className="btn" htmlFor="image-upload">
                          Change the image
                        </Form.Label>
                      </div>
                    </>
                  ) : (
                    <Form.Label
                      className="d-flex justify-content-center"
                      htmlFor="image-upload"
                    >
                      {/* <Asset
                        src={Upload}
                        message="Click or tap to upload an image"
                      /> */}
                    </Form.Label>
                  )}

                  <Form.File
                    id="image-upload"
                    accept="image/*"
                    onChange={handleChangeImage}
                    ref={imageInput}
                  />
                </Form.Group>
                {/* {errors?.image?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))} */}

                <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
                  Close Task
                </Button>
              </Form>
            </Col>
          </Row>
        </Card.Footer>
      )}
    </Container>
  );
}

export default UserTaskUpdateForm;
