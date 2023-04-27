import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";
import btnStyles from "../../styles/Button.module.css";
import { useRedirect } from "../../hooks/useRedirect";

function CategoriesCreateForm() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});

  const history = useHistory();

  const [categoryData, setCategoryData] = useState({
    category_name: "",
  });

  const { category_name } = categoryData;

  const handleChange = (event) => {
    setCategoryData({
      ...categoryData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("category_name", category_name);

    try {
      await axiosReq.post("/categories/", formData);
      history.push("/categories");
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
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  type="text"
                  name="category_name"
                  value={category_name}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors?.category_name?.map((message, idx) => (
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

export default CategoriesCreateForm;
