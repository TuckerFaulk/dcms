import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { NavLink } from "react-router-dom";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/CategoriesPage.module.css";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useHistory } from "react-router-dom";

function CategoriesPage() {
  const [categories, setCategories] = useState();

  const history = useHistory();

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
  }, []); // Add params so useEffects refreshes when category deleted


  const handleEdit = (id) => {
    history.push(`/categories/${id}/edit`);
  }

  
  const handleDelete = async (id) => {
    try {
      axiosRes.delete(`/categories/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

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
          <Card key={category.id} style={{ width: "18rem" }} className={styles.Card}>
            <Card.Body>
              <Row>
                <Col className="mt-2" sm={10}>
                  <p className="mb-0">{category.category_name}</p>
                </Col>
                <Col sm={2}>
                  <MoreDropdown handleEdit={() => handleEdit(category.id)} handleDelete={() => handleDelete(category.id)} />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
}

export default CategoriesPage;
