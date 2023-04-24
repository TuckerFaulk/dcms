import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";

function CategoriesEditForm() {
  const [errors, setErrors] = useState({});

  const history = useHistory();
  const { id } = useParams();

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

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/categories/${id}`);
        setCategoryData(data);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("category_name", category_name);

    try {
      await axiosReq.put(`/categories/${id}/`, formData);
      history.push("/categories");
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
              </Form>

              <Button type="submit">Update</Button>
              <Button onClick={() => history.goBack()}>Cancel</Button>
            </div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default CategoriesEditForm;
