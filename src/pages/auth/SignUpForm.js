import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import appStyles from "../../App.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import btnStyles from "../../styles/Button.module.css";
import axios from "axios";
import { useRedirect } from "../../hooks/useRedirect";

/**
 * Render the SignUp form.
 * Source: CI's Moments Video's
 */
const SignUpForm = () => {
  useRedirect('loggedIn')
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  /**
   * Convert inputed data into Key+Value pairs
   */
  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * Push data to the API.
   * Reroute user to the login page.
   * Display error message for invalid data.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("dj-rest-auth/registration/", signUpData);
      history.push("/signin");
    } catch (err) {
        setErrors(err.response?.data)
    }
  };

  return (
    <Row>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1>Sign Up</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => 
                <Alert variant="warning" key={idx}>{message}</Alert>
            )}

            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => 
                <Alert variant="warning" key={idx}>{message}</Alert>
            )}

            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((message, idx) => 
                <Alert variant="warning" key={idx}>{message}</Alert>
            )}

            <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
              Sign Up
            </Button>
            {errors.non_field_errors?.map((message, idx) => 
                <Alert variant="warning" key={idx} className="mt-3">{message}</Alert>
            )}

          </Form>
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
    </Row>
  );
};

export default SignUpForm;
