import React, { useEffect, useState, useRef } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Alert, Image } from "react-bootstrap";
import btnStyles from "../../styles/Button.module.css";

function ActionsEditForm() {
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
    image: "",
  });

  const {
    action_title,
    category,
    description,
    assigned_to,
    risk_rating,
    image,
  } = actionData;

  const categoryInput = useRef(null);
  const riskRatingInput = useRef(null);
  const assignedToInput = useRef(null);
  const imageInput = useRef(null);

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: profiles }, { data: categories }, { data: action }] =
          await Promise.all([
            axiosReq.get(`/profiles/?owner__is_staff=false`),
            axiosReq.get(`/categories/`),
            axiosReq.get(`/actions/${id}`),
          ]);
        setProfiles(profiles);
        setCategories(categories);
        setActionData(action);
        setDueDate(action.due_date);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, []);

  const handleChange = (event) => {
    setActionData({
      ...actionData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setActionData({
        ...actionData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    console.log(image);

    formData.append("action_title", action_title);
    formData.append("description", description);
    formData.append("assigned_to", assignedToInput.current.value);
    formData.append("category", categoryInput.current.value);
    formData.append("due_date", dueDate);
    formData.append("risk_rating", riskRatingInput.current.value);

    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/actions/${id}/`, formData);
      history.push(`/my-actions/${id}/`);
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
                {errors?.action_title?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}

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
                {errors?.description?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}

                <Form.Group>
                  <Form.Label>Assign To</Form.Label>
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
                {errors?.assigned_to?.map((message, idx) => (
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
                      <option value={category.id}>
                        {category.category_name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                {errors?.category?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}

                <Form.Group>
                  <Form.Label>Due Date</Form.Label>
                  <Col>
                    <Form.Control
                      type="date"
                      name="due_date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                    />
                  </Col>
                </Form.Group>
                {errors?.due_date?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}

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
                {errors?.risk_rating?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}

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
                {errors?.image?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
              </Form>

              <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                type="submit"
              >
                Update
              </Button>
              <Button
                className={`${btnStyles.Button}`}
                onClick={() => history.goBack()}
              >
                Cancel
              </Button>
            </div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default ActionsEditForm;
