import React, { useEffect, useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";
import { useCurrentProfile } from "../../contexts/CurrentProfileContext";
import styles from "../../styles/ActionsCreateForm.module.css";
import { useRedirect } from "../../hooks/useRedirect";

/**
 * Render ActionsCreateForm.
 * Supply user with input fields to create an action.
 */
function ActionsCreateForm() {
  useRedirect("loggedOut");
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
  const currentProfile = useCurrentProfile();

  /**
   * Retrieve profiles and categories data
   * to display in form.
   */
  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: profiles }, { data: categories }] = await Promise.all([
          axiosReq.get(`/profiles/?owner__is_staff=false`),
          axiosReq.get(`/categories/`),
        ]);
        setProfiles(profiles);
        setCategories(categories);
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, []);

  /**
   * Populate ActionData strings.
   */
  const handleChange = (event) => {
    setActionData({
      ...actionData,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * Change uploaded image.
   * clear previously uploaded image.
   */
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setActionData({
        ...actionData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  /**
   * Push data to API.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("action_title", action_title);
    formData.append("description", description);
    formData.append("category", categoryInput.current.value);
    formData.append("due_date", dueDate);
    formData.append("risk_rating", riskRatingInput.current.value);

    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    if (currentProfile?.is_staff) {
      formData.append("assigned_to", assignedToInput.current.value);
    } else {
      formData.append("assigned_to", currentProfile?.id);
    }

    try {
      await axiosReq.post("/actions/", formData);
      history.push("/my-actions");
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
              <Form.Group controlId="formBasicTaskName">
                <Form.Label>Action Title</Form.Label>
                <Form.Control
                  type="text"
                  name="action_title"
                  value={action_title}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors?.task_name?.map((message, idx) => (
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

              {currentProfile?.is_staff && (
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
              )}
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
                    <option key={category.id} value={category.id}>
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
                {image && (
                  <>
                    <figure>
                      <Image
                        className={`${styles.ImageUpload}`}
                        src={image}
                        rounded
                      />
                    </figure>
                  </>
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

              <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                type="submit"
              >
                Create
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

export default ActionsCreateForm;
