import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { NavLink } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/CategoriesPage.module.css";

function CategoriesPage() {
  const [categories, setCategories] = useState();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get("/categories/");
        setCategories(data);
        console.log(data)
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, []); // Dont know whether I need to add anything in here?

  return (
    <Container>
      <Row>
        <Col className="text-right">
          <NavLink to="/categories/create">
            <i className="fas fa-plus-square"></i>Add Category
          </NavLink>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center align-items-center pt-3">
        {categories?.map((category) => (
          <Card style={{ width: "18rem" }} className={styles.Card}>
            <Card.Body className="text-center">
              <NavLink to="/categories/">
                {category.category_name}
              </NavLink>
              <i className="fas fa-ellipsis-vertical pl-5"></i>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
}

export default CategoriesPage;
